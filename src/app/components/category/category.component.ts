import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { Category } from '../../interfaces/category';
import { Guid } from 'guid-typescript';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit{

  errorMessage = '';
  @Output() selectedCategory: EventEmitter<string> = new EventEmitter<string>();

  private categorySelectedSubject = new BehaviorSubject<string>("5FDE9193-D55D-4571-A3A0-E916A807F299");
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  categories$:Observable<Category[]>;

  constructor(private cs: CategoryService) { }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(categoryId);
    this.selectedCategory.emit(categoryId)
  }

  ngOnInit(){
    this.categories$ = this.cs.getCategories()
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
    console.log(JSON.stringify(this.cs.flatCats));
  }

}
