import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'category-selector',
  template:
    `
  <ul *ngIf="categories.length">
    <div *ngFor="let category of categories">
      <li>
        <button value="{{category.id}}" (click)='selectCategory($event.target.value)'>{{category.name}}</button>
      </li>
      <category-selector *ngIf="category.categories.length" [categories]="category.categories" (categoryChanged)='onCategoryChanged($event)'></category-selector>
    </div>
  </ul>
  `,
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  @Input() categories: any[];
  @Input() key: string;
  @Input() customEventName: string;
  
  @Output() categoryChanged = new EventEmitter<string>();

  constructor() { }

  selectCategory(value:string): void {
    console.log("CategoryComponent: You clicked " + value);
    this.categoryChanged.emit(value);
  }

  onCategoryChanged(value: string): void {
    this.categoryChanged.emit(value);
  }

  ngOnInit() {
  }

}
