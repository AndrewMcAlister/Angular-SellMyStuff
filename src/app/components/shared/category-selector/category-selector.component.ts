import { Component, Input, Output, EventEmitter} from '@angular/core';
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
export class CategorySelectorComponent {
  @Input() categories: any[];
  @Output() categoryChanged = new EventEmitter<string>();

  expanded: boolean;
  selectedId: string;

  constructor(private catSer: CategoryService) {
    expanded: false;
    selected: false;
   }

  selectCategory(value: string): void {
    this.categoryChanged.emit(value);
    this.selectedId=value;
    this.catSer.selectedCategoryId=value;
    }

  //bubbles child events
  onCategoryChanged(value: string): void {
    this.categoryChanged.emit(value);
    this.selectedId=value;
  }

  collapseChildren(): void {
    this.expanded = !this.expanded;
  }

}
