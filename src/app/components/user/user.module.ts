import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserAccountComponent } from './pages/user-account.component';
import { UserRegisterComponent } from './pages/user-register.component';
import { LoginComponent } from './pages/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
      LoginComponent,
      UserAccountComponent,
      UserRegisterComponent   
    ],
    imports: [
      SharedModule,
      RouterModule.forChild([
          { path: '', component: LoginComponent},
          { path: 'register', component: UserRegisterComponent},
          { path: 'account', component: UserAccountComponent}
      ])
    ],
    exports: [
        LoginComponent,
        UserAccountComponent,
        UserRegisterComponent 
    ],
    providers: [],
  })
  export class UserModule { }
  