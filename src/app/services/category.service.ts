import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,BehaviorSubject, throwError,Subject, of } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { Guid } from "guid-typescript";
import { Category } from '../components/shared/category/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private categoryUrl = 'api/categories';
    private categories: Category[];
    private selectedCategorySource = new BehaviorSubject<Category | null>(null);
    selectedCategoryChanges$ = this.selectedCategorySource.asObservable();

    // All Categories
    categories$:Observable<Category[]> = this.http.get<Category[]>(this.categoryUrl)
        .pipe(
            tap(data => console.log('Categories', JSON.stringify(data))),
            catchError(this.handleError),
            shareReplay(1)
        ).source
    ;

    constructor(private http: HttpClient) {
    }

    changeSelectedCategory(selectedCategory: Category | null): void {
        this.selectedCategorySource.next(selectedCategory);
    }

    saveCategory(Category: Category): Observable<string | Category> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (Category.id === null) {
            return this.createCategory(Category, headers);
        }
        return this.updateCategory(Category, headers);
    }

    deleteCategory(id: Guid): Observable<string | Category> {
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
                    this.changeSelectedCategory(data);
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
            'id': Guid.create(),
            name: '',
            parentId: null,
            childCategories: null
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
