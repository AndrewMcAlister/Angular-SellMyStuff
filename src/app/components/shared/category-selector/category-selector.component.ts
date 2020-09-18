import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Guid } from 'guid-typescript';
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
          <button value="{{category.id.value.toString()}}" class="categoryButton" [ngClass]="{catSelected:[selectedId]==category.id.value.toString()}" (click)='selectCategory($event.target.value)'>{{category.name}}</button>
        </span>
      </li>
      <category-selector *ngIf="category.categories.length && expanded" [categories]="category.categories"></category-selector>
    </div>
  </ul>
  `,
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit, OnDestroy {
  @Input() categories: Category[];
  sub: Subscription;

  expanded: boolean;
  selectedCategory: Category;

  get selectedId(): string {
    if (this.selectedCategory) {
      console.log('this.selectedCategory.id ' + JSON.stringify(this.selectedCategory.id))
      return this.selectedCategory.idStr;
    }
    else return null;
  }

  get selectedCatName(): string {
    if (this.selectedCategory)
      return this.selectedCategory.name;
    else return null;
  }

  constructor(private catSer: CategoryService) {
    expanded: false;
    selected: false;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  selectCategory(id: string): void {
    console.log('selectCategory Cat is ' + id);
    this.catSer.changeSelectedCategory(Guid.parse(id));
  }

  ngOnInit() {
    this.sub = this.catSer.selectedCategory$.subscribe(cat => this.selectedCategory = cat);
  }

  collapseChildren(): void {
    this.expanded = !this.expanded;
  }

}
