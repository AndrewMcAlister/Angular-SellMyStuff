import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategorySelectorComponent } from '../../shared/category-selector/category-selector.component';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category';
import { Observable, Subscription } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { SaleItemService } from 'src/app/services/saleitem.service';
import { SaleItem } from 'src/app/interfaces/saleitem';

@Component({
  templateUrl: './saleitem-view.component.html',
  styleUrls: ['./saleitem-view.component.css']
})
export class SaleitemViewComponent implements OnInit, OnDestroy {

  searchText: string;
  categoryId: string;
  categoryName: string;
  categories: Category[];
  searchResults$: Observable<SaleItem[] | null>;
  subSelCat: Subscription;
  errorMessage$: Observable<string[] | null>;
  imageWidth = 100;
  imageMargin = 2;

  private _selectedCategory: Category;
  get selectedCategory(): Category {
    return this._selectedCategory;
  }
  set selectedCategory(value: Category) {
    this._selectedCategory = value;
    if (this._selectedCategory) {
      console.log("Category changed to " + value.name);
      this.sis.clearErrors();
    }
  }

  constructor(private cs: CategoryService, private sis: SaleItemService) {
  }
  ngOnDestroy(): void {
    this.subSelCat.unsubscribe;
  }

  ngOnInit(): void {
    //this.searchResults$=this.sis.searchSaleItems(this.selectedCategory.includedCategoryIds,this.searchText);
    this.cs.getCategories().subscribe(p => this.categories = p); //supplies the category[] to the category-selector component
    this.subSelCat = this.cs.selectedCategory$.subscribe(cat => this.selectedCategory = cat);
    this.errorMessage$ = this.sis.errorMessage$;
  }

  SearchButtonClick() {
    this.searchResults$ = this.sis.searchSaleItems(this.selectedCategory?.includedCategoryIds, this.searchText);
  }

}
