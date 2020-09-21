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
  @Input() categories: Category[];
  sub: Subscription;

  expanded: boolean;
  selectedId: string;

  constructor(private catSer: CategoryService) {
    expanded: false;
    selected: false;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  selectCategory(id: string): void {
    //console.log('selectCategory Cat is ' + id);
    this.catSer.changeSelectedCategory(id);
  }

  ngOnInit() {
    this.sub = this.catSer.selectedCategoryId$.subscribe(id => this.selectedId = id);
  }

  collapseChildren(): void {
    this.expanded = !this.expanded;
  }

}
