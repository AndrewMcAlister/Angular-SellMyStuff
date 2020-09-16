import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'category-selector',
  template:
    `
  <ul *ngIf="categories.length">
    <div *ngFor="let category of categories">
      <li>
        <span>
          <button (click)='collapseChildren()' class="collapseCross" *ngIf="category.categories.length && !expanded">+</button>
          <button (click)='collapseChildren()' class="collapseCross" *ngIf="category.categories.length && expanded">-</button>        
          <button value="{{category.id}}" class="categoryButton" [ngClass]="{catSelected:[selectedId]==category.id}" (click)='selectCategory($event.target.value)'>{{category.name}}</button>
        </span>
      </li>
      <category-selector *ngIf="category.categories.length && expanded" [categories]="category.categories"></category-selector>
    </div>
  </ul>
  `,
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit, OnDestroy {
  @Input() categories: any[];
  //@Output() categoryChanged = new EventEmitter<Category>();
  sub: Subscription;

  expanded: boolean;
  selectedCategory: Category;

  get selectedId(): string {
    if(this.selectedCategory)
      return this.selectedCategory.id;
    else return "";
  }
  
  constructor(private catSer: CategoryService) {
    expanded: false;
    selected: false;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  selectCategory(value: string): void {
    this.catSer.changeSelectedCategory(value);
  }

  ngOnInit() {
    this.sub = this.catSer.selectedCategory$.subscribe(cat => this.selectedCategory = cat);
  }

  collapseChildren(): void {
    this.expanded = !this.expanded;
  }

}
