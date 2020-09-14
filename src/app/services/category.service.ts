import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subject, of } from 'rxjs';
import { catchError, tap, shareReplay, filter } from 'rxjs/operators';
import { Guid } from "guid-typescript";
import { Category } from '../interfaces/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private categoryUrl = 'api/categories';
    private categories: Category[]=[];
    private flatCats: Category[]=[];

    private selectedCategoryId = new BehaviorSubject<string | null>(null);
    //private categoriesInSelection = new BehaviorSubject<string[] | null>(null);
    selectedCategoryId$ = this.selectedCategoryId.asObservable();
    //categoriesInSelection$ = this.categoriesInSelection.asObservable();

    // All Categories
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoryUrl)
            .pipe(
                catchError(this.handleError),
                tap(c => {
                    this.categories = c;
                    this.flatCats = this.flattenCategories(c[0],this.flatCats);
                })
            );
        shareReplay(1)
    }

    constructor(private http: HttpClient) {
    }

    changeSelectedCategory(id: string): void {
        if (id) {
            this.selectedCategoryId.next(id);
        }
    }

    getCategoriesInCategory(id: string): string[] | null {
        var result: string[];
        if (this.flatCats && id) {
            var c=this.flatCats.find(p=>p.id==id);
            if(c) {
                result=this.flattenCategoryIds(c,result);
            }
        }
        return result;
    }

    getCategory(id: string, cats: (Category[] | null)): Category {
        if (this.flatCats) {
            console.log("Service has flatCats ");
            var cat = this.flatCats.find(p => p.id.toString() == id);
            console.log("Found category is " + JSON.stringify(cat));
            return cat;
        }
        else
            return this.initializeCategory();
    }

    flattenCategories(cat: Category, catArr: Category[]): Category[] {
        if (!cat.categories || cat.categories.length == 0)
            return catArr;
        if (cat.categories && cat.categories.length > 0) {
            cat.categories.forEach(c => {
                catArr.push(c);
                this.flattenCategories(c, catArr);
            });
        }
    }

    flattenCategoryIds(cat: Category, catIdArr: string[]): string[] {
        if (!cat.categories || cat.categories.length == 0)
            return catIdArr;
        if (cat.categories && cat.categories.length > 0) {
            cat.categories.forEach(c => {
                catIdArr.push(c.id);
                this.flattenCategoryIds(c, catIdArr);
            });
        }
    }    

    saveCategory(Category: Category): Observable<string | Category> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (Category.id === null) {
            return this.createCategory(Category, headers);
        }
        return this.updateCategory(Category, headers);
    }

    deleteCategory(id: string): Observable<string | Category> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.categoryUrl}/${id}`;
        return this.http.delete<Category>(url, { headers: headers })
            .pipe(
                tap(data => console.log('deleteCategory: ' + id)),
                tap(data => {
                    const foundIndex = this.categories.findIndex(item => item.id === id);
                    if (foundIndex > -1) {
                        this.categories.splice(foundIndex, 1);
                        this.changeSelectedCategory(null);
                    }
                }),
                catchError(this.handleError)
            );
    }

    private createCategory(Category: Category, headers: HttpHeaders): Observable<string | Category> {
        Category.id = null;
        return this.http.post<Category>(this.categoryUrl, Category, { headers: headers })
            .pipe(
                tap(data => console.log('createCategory: ' + JSON.stringify(data))),
                tap(data => {
                    this.categories.push(data);
                    this.changeSelectedCategory(data.id);
                }),
                catchError(this.handleError)
            );
    }

    private updateCategory(Category: Category, headers: HttpHeaders): Observable<string | Category> {
        const url = `${this.categoryUrl}/${Category.id}`;
        return this.http.put<Category>(url, Category, { headers: headers })
            .pipe(
                tap(data => console.log('updateCategory: ' + Category.id)),
                catchError(this.handleError)
            );
    }

    private initializeCategory(): Category {
        // Return an initialized object
        return {
            'id': Guid.create().toString(),
            name: '',
            parentId: null,
            categories: null
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
