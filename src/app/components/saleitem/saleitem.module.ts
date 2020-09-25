import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SaleitemViewComponent } from '../saleitem/saleitem-view/saleitem-view.component';
import { CategorySelectorComponent } from '../shared/category-selector/category-selector.component';
import { SaleitemDetailComponent } from './saleitem-detail/saleitem-detail.component';
import { SaleItemService } from 'src/app/services/saleitem.service';


@NgModule({
    declarations: [
      SaleitemViewComponent,
      CategorySelectorComponent,
      SaleitemDetailComponent   
    ],
    imports: [
      SharedModule,      
      RouterModule.forChild([
          { path: '', component: SaleitemViewComponent},
          { path: 'saleitems', component: SaleitemDetailComponent}
      ])
    ],
    exports: [
        CategorySelectorComponent,
        SaleitemViewComponent,
        SaleitemDetailComponent  
    ],
    providers: [
      SaleItemService
    ],
  })
  export class SaleItemModule { }
  