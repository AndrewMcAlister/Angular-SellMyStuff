import { Component, OnInit} from '@angular/core';
import { CategorySelectorComponent } from '../../shared/category-selector/category-selector.component';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

@Component({
  templateUrl: './saleitem-view.component.html',
  styleUrls: ['./saleitem-view.component.css']
})
export class SaleitemViewComponent implements OnInit {

  searchText: string;

  //Category Component fields
  categories: Category[];
  selectedCategoryId: string;

  constructor(private cs: CategoryService) { }

  ngOnInit(): void {
    this.cs.getCategories() //supplies the category[] to the category-selector component
      .pipe(
        tap(cats => this.categories = cats)
      ).subscribe(p => this.categories = p);
  }

  onCategoryChanged(value: string): void {
    this.selectedCategoryId=value;
  }

  //this.cs.getCategoriesInCategory
}
