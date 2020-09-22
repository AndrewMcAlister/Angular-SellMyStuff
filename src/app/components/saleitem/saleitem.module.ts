import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { SaleitemViewComponent } from '../saleitem/saleitem-view/saleitem-view.component';
import { CategorySelectorComponent } from '../shared/category-selector/category-selector.component';
import { SaleitemDetailComponent } from './saleitem-detail/saleitem-detail.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
      SaleitemViewComponent,
      CategorySelectorComponent,
      SaleitemDetailComponent   
    ],
    imports: [
      RouterModule.forChild([
          { path: '', component: SaleitemViewComponent},
          { path: 'saleitems', component: SaleitemDetailComponent}
      ]),
      Router,
      ActivatedRoute
    ],
    exports: [
        CategorySelectorComponent,
        SaleitemViewComponent,
        SaleitemDetailComponent  
    ],
    providers: [],
  })
  export class SaleItemModule { }
  