import { Injectable, OnInit, Pipe } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subject, of, combineLatest, from } from 'rxjs';
import { catchError, tap, map, shareReplay, filter } from 'rxjs/operators';
import { SaleItem } from '../interfaces/saleitem';
import { Guid } from "guid-typescript";
import { AppDataService } from './app-data.service'
import { CategoryService } from './category.service';
import { Category } from '../interfaces/category';
import { stringify } from 'querystring';
import { SaleitemDetailComponent } from '../components/saleitem/saleitem-detail/saleitem-detail.component';

@Injectable({
    providedIn: 'root'
})
export class SaleItemService {
    private saleitemsUrl = 'api/saleitems';
    private selectedSaleItem = new BehaviorSubject<SaleItem | null>(null);
    selectedSaleItemChanges$ = this.selectedSaleItem.asObservable();
    allSaleItemsWithCategories: SaleItem[] = [];
    errorMessage$: Observable<string[] | null>;
    searchResults$: Observable<SaleItem[] | null>;
    
    constructor(private http: HttpClient,
        private cs: CategoryService) {
    }

    // All saleitems
    getAllSaleItems(): Observable<SaleItem[]> {
        var resp = this.http.get<SaleItem[]>(this.saleitemsUrl)
            .pipe(
                tap(data => console.log('SaleItems', JSON.stringify(data)))
            );
        return resp;
    }

    clearErrors(): void {
        this.errorMessage$ = null;
    }


    //All saleitems
    getAllSaleItemsWithCategories(): Observable<SaleItem[]> {
        return this.http.get<SaleItem[]>(this.saleitemsUrl)
            .pipe(
                map(saleitems =>
                    saleitems.map(si => ({
                        ...si,
                        category: (this.cs.flatCats.find(c => si.categoryId == c.id)).name
                    }) as SaleItem)
                ),
                tap(p => {
                    //console.log('All Items returned ' + JSON.stringify(p));
                    this.allSaleItemsWithCategories = p;
                }),
                shareReplay(),
            )
    }

    searchSaleItems(cats: string[], searchText: string): void {
        this.errorMessage$ = null;
        var search: string = "";
        if (searchText)
            search = searchText?.toLocaleLowerCase();

        console.log("Categories searched are " + JSON.stringify(cats));
        var results = this.getAllSaleItemsWithCategories().pipe(
            map(siArray =>
                siArray.filter((p: SaleItem) =>
                    (
                        !cats || (cats.includes(p.categoryId))
                        &&
                        (
                            p.tags.map(t => t.toLocaleLowerCase()).includes(search.toLocaleLowerCase())
                            || p.description.toLocaleLowerCase().includes(search)
                            || p.title.toLocaleLowerCase().includes(search)
                        )
                    )
                )
            )
        );
        if (results)
            this.searchResults$=results;
        else {
            this.errorMessage$ = of(["No results"]);
        }
    }

    changeSelectedSaleItem(selectedSaleItem: SaleItem | null): void {
        this.selectedSaleItem.next(selectedSaleItem);
    }

    getSaleItem(id: string): SaleItem | null {
        if (id === null) {
            return this.initializeSaleItem();
        }
        var foundItem = this.allSaleItemsWithCategories.find(si => si.id == id);

        if (foundItem) {
            return foundItem;
        }
        else
            return null;
    }

    getSaleItemsByCategory(categoryId: string): SaleItem[] {
        if (categoryId == null) {
            throwError("Please supply a category");
        }
        return this.allSaleItemsWithCategories.filter(p => p.categoryId == categoryId);
    };

    saveSaleItem(SaleItem: SaleItem): Observable<SaleItem> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (SaleItem.id === null) {
            return this.createSaleItem(SaleItem, headers);
        }
        return this.updateSaleItem(SaleItem, headers);
    }

    deleteSaleItem(id: string): void {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.saleitemsUrl}/${id}`;
        this.http.delete<SaleItem>(url, { headers: headers });
        catchError(this.handleError);
    }

    private createSaleItem(saleitem: SaleItem, headers: HttpHeaders): Observable<SaleItem> {
        saleitem.id = Guid.create().toString();
        return this.http.post<SaleItem>(this.saleitemsUrl, saleitem, { headers: headers })
            .pipe(
                tap(data => console.log('createSaleItem: ' + JSON.stringify(data))),
                tap(data => {
                    this.http.put<SaleItem>(this.saleitemsUrl, data);
                    this.changeSelectedSaleItem(data);
                })
            );
    }

    private updateSaleItem(SaleItem: SaleItem, headers: HttpHeaders): Observable<SaleItem> {
        const url = `${this.saleitemsUrl}/${SaleItem.id}`;
        return this.http.put<SaleItem>(url, SaleItem, { headers: headers })
            .pipe(
                tap(data => console.log('updateSaleItem: ' + SaleItem.id))
            );
    }

    private initializeSaleItem(): SaleItem {
        // Return an initialized object
        return {
            id: null,
            title: '',
            description: '',
            price: 0,
            categoryId: null,
            category: null,
            imageUrls: [],
            tags: [],
            userId: null,
            created: new Date(),
            lastRevised: null,
            topImageIndex: 0,
            quantity: 0
        };
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }

}
