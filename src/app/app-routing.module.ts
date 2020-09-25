import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SaleitemDetailComponent } from './components/saleitem/saleitem-detail/saleitem-detail.component';
import { SaleitemViewComponent } from './components/saleitem/saleitem-view/saleitem-view.component';
import { LoginComponent } from './components/user/pages/login.component';
import { UserAccountComponent } from './components/user/pages/user-account.component';
import { UserRegisterComponent } from './components/user/pages/user-register.component';

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
            },                        
            {
                path: ':id',
                component: SaleitemDetailComponent
            },
            {
                path: 'account',
                component: UserAccountComponent
            },
            {
                path: 'register',
                component: UserRegisterComponent
            },
            {
                path: 'login',
                component: LoginComponent
            }

        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
