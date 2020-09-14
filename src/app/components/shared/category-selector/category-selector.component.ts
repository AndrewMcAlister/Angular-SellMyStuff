import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
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
      <category-selector *ngIf="category.categories.length && expanded" [categories]="category.categories" (categoryChanged)='onCategoryChanged($event)'></category-selector>
    </div>
  </ul>
  `,
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  @Input() categories: any[];
  @Output() categoryChanged = new EventEmitter<string>();
  sub: Subscription;

  expanded: boolean;
  selectedId: string;

  constructor(private catSer: CategoryService) {
    expanded: false;
    selected: false;
   }

  selectCategory(value: string): void {
    console.log("Component last selected category was " + this.selectedId);    
  this.catSer.changeSelectedCategory(value);
    console.log("Component selected category is " + JSON.stringify(value));    
    }

    ngOnInit() {
      this.sub=this.catSer.selectedCategoryId$.subscribe(
        id=>this.selectedId=id
      );
    }

  collapseChildren(): void {
    this.expanded = !this.expanded;
  }

}
