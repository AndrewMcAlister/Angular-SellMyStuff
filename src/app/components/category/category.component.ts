import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from './category';
import { Guid } from 'guid-typescript';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Output() selectedCategory: EventEmitter<Guid> = new EventEmitter<Guid>();

  constructor(private categoryService: CategoryService) { }

  private categorySelectedSubject = new BehaviorSubject<Guid>(Guid.parse("5FDE9193-D55D-4571-A3A0-E916A807F299"));
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  categories$: Observable<Category[]>;
  
  ngOnInit(): void {
    this.categories$ = this.categoryService.categories$;
  }

  onSelected(categoryId: Guid): void {
    this.categorySelectedSubject.next(categoryId);
    this.selectedCategory.emit(categoryId)
  }

}
