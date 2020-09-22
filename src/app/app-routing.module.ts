import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SaleitemDetailComponent } from './components/saleitem/saleitem-detail/saleitem-detail.component';
import { SaleitemViewComponent } from './components/saleitem/saleitem-view/saleitem-view.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                component: SaleitemViewComponent
            },
            {
                path: 'saleitems',
                component: SaleitemDetailComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
