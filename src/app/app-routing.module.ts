import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SaleitemViewComponent } from './components/saleitem/saleitem-view/saleitem-view.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                component: SaleitemViewComponent
            },
            {
                path: 'forsale',
                component: SaleitemViewComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
