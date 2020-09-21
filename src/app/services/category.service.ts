import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subject, of } from 'rxjs';
import { catchError, tap, shareReplay, filter } from 'rxjs/operators';
import { Guid } from "guid-typescript";
import { Category } from '../interfaces/category';
import { newArray } from '@angular/compiler/src/util';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private categoryUrl = 'api/categories';
    private categories: Category[]=[];
    public flatCats: Category[]=[];

    private selectedCategoryId = new BehaviorSubject<string | null>(null);
    selectedCategoryId$ = this.selectedCategoryId.asObservable();
    
    private selectedCategory = new BehaviorSubject<Category | null>(null);
    public selectedCategory$=this.selectedCategory.asObservable();

    // All Categories
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoryUrl)
            .pipe(
                catchError(this.handleError),
                tap(c => {
                    this.categories = c;
                    //console.log(JSON.stringify(c));
                    this.flatCats=[];
                    this.flattenCategories(c[0],this.flatCats);
                }),
                shareReplay()
            );
    }

    constructor(private http: HttpClient) {
    }

    changeSelectedCategory(id: string): void {        
        if (id) {
            var cat=this.getCategory(id);
            cat.includedCategoryIds=this.getCategoriesInCategory(id);
            //console.log('changeSelectedCategory Cat is ' + id.toString());
            this.selectedCategoryId.next(id);
            this.selectedCategory.next(cat);
        }
    }

    getCategoriesInCategory(id: string): string[] | null {
        var result: string[]=[];
        if (this.flatCats && id) {
            var c = this.flatCats.find(p => p.id == id);
            if (c) {
                this.flattenCategoryIds(c,result); 
            }
        }
        return result;
    }

    getCategory(id: string): Category {
        var result:Category;
        //console.log('getCategory ' + id.toString());
        if (this.flatCats) {
            result = this.flatCats.find(p => p.id == id);
            //getCategory result: ' + JSON.stringify(result.id))
        }
        if(!result)
            result= this.initializeCategory();

        return result;
    }

    countCategories(cat: Category): number {
        var result=1;
        if (cat.categories && cat.categories.length > 0) {
            cat.categories.forEach(c => {
                result += this.countCategories(c);
            });
        }
        return result;
    }

    flattenCategories(cat: Category, catArr: Category[]): void {
        catArr.push(cat);
        if (cat.categories && cat.categories.length > 0) {
            cat.categories.forEach(c => {
                this.flattenCategories(c, catArr);
            });
        }
    }

    flattenCategoryIds(cat: Category, catIdArr: string[]): void {
        catIdArr.push(cat.id);
        if (cat.categories && cat.categories.length > 0) {
            cat.categories.forEach(c => {
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
        var c = new Category(Guid.create().toString(),'new category',null,[],[]);
        return c;
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
