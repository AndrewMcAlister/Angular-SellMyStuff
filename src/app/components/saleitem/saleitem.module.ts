import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { SaleitemViewComponent } from '../saleitem/saleitem-view/saleitem-view.component';
import { CategorySelectorComponent } from '../shared/category-selector/category-selector.component';
import { SaleitemDetailComponent } from './saleitem-detail/saleitem-detail.component';

@NgModule({
    declarations: [
      //SaleitemViewComponent,
      CategorySelectorComponent,
      SaleitemDetailComponent   
    ],
    imports: [
      FormsModule,
      RouterModule.forChild([
          { path: '', component: SaleitemViewComponent},
          { path: ':id', component: SaleitemDetailComponent}
      ]),
    ],
    exports: [
        //SaleitemViewComponent,
        CategorySelectorComponent,
        SaleitemDetailComponent  
    ],
    providers: [],
  })
  export class AppModule { }
  