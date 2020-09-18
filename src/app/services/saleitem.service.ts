import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subject, of, combineLatest, from } from 'rxjs';
import { catchError, tap, map, shareReplay, filter } from 'rxjs/operators';
import { SaleItem } from '../interfaces/saleitem';
import { Guid } from "guid-typescript";
import { AppDataService } from './app-data.service'
import { CategoryService } from './category.service';
import { Category } from '../interfaces/category';
import { stringify } from 'querystring';

@Injectable({
    providedIn: 'root'
})
export class SaleItemService {
    private saleitemsUrl = 'api/saleitems';
    private selectedSaleItem = new BehaviorSubject<SaleItem | null>(null);
    selectedSaleItemChanges$ = this.selectedSaleItem.asObservable();
    allSaleItemsWithCategories$ = this.getAllSaleItemsWithCategories();

    constructor(private http: HttpClient,
        private categoryservice: CategoryService) {
    }

    // All saleitems
    getAllSaleItems(): Observable<SaleItem[]> {
        var resp = this.http.get<SaleItem[]>(this.saleitemsUrl)
            .pipe(
                tap(data => console.log('SaleItems', JSON.stringify(data))),
            );
        return resp;
    }

    // All saleitems
    getAllSaleItemsWithCategories(): Observable<SaleItem[]> {
        return combineLatest([
            this.http.get<SaleItem[]>(this.saleitemsUrl),
            this.categoryservice.getCategories()
        ]).pipe(
            map(([saleitems, categories]) =>
                saleitems.map(si => ({
                    ...si,
                    category: categories.find((c: Category) => si.categoryId == c.id).name
                }) as SaleItem)
            ),
            shareReplay(1)
        );
    }

    searchSaleItems(cats: Guid[], searchText: string): Observable<SaleItem[]> {
        return this.allSaleItemsWithCategories$
            .pipe(
                map(si =>
                    si.filter(
                        p => cats.includes(p.categoryId)
                            && (
                                p.tags.includes(searchText)
                                || p.description.includes(searchText)
                                || p.title.includes(searchText)
                            )
                    )
                )
            )
    };


    searchSaleItemsWithCategory(cats: Guid[], searchText: string) {
        return combineLatest([
            this.searchSaleItems(cats, searchText),
            this.categoryservice.getCategories()
        ]).pipe(
            map(([saleitems, categories]) =>
                saleitems.map(si => ({
                    ...si,
                    category: categories.find((c: Category) => si.categoryId == c.id).name
                }) as SaleItem)
            ),
            shareReplay(1)
        );
    }

    changeSelectedSaleItem(selectedSaleItem: SaleItem | null): void {
        this.selectedSaleItem.next(selectedSaleItem);
    }

    getSaleItem(id: Guid): Observable<SaleItem> | null {
        if (id === null) {
            return of(this.initializeSaleItem());
        }
        var foundItem = this.allSaleItemsWithCategories$.pipe(
            map(si => si.find(si => si.id == id)
            ));

        if (foundItem) {
            return foundItem;
        }
        else
            return null;
    }

    getSaleItemByCategory(categoryId: Guid): Observable<SaleItem[]> {
        if (categoryId == null) {
            throwError("Please supply a category");
        }
        return this.allSaleItemsWithCategories$.pipe(
            map(si => si.filter(p => p.categoryId == categoryId))
        )
    };

    saveSaleItem(SaleItem: SaleItem): Observable<SaleItem> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (SaleItem.id === null) {
            return this.createSaleItem(SaleItem, headers);
        }
        return this.updateSaleItem(SaleItem, headers);
    }

    deleteSaleItem(id: Guid): void {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.saleitemsUrl}/${id}`;
        this.http.delete<SaleItem>(url, { headers: headers });
        catchError(this.handleError);
    }

    private createSaleItem(saleitem: SaleItem, headers: HttpHeaders): Observable<SaleItem> {
        saleitem.id = Guid.create();
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
