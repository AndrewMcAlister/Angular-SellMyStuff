import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { AppComponent } from './app.component';
import { SaleitemViewComponent } from './components/saleitem/saleitem-view/saleitem-view.component';
import { AppRoutingModule } from './app-routing.module';
import { CategorySelectorComponent } from './components/shared/category-selector/category-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppDataService } from './services/app-data.service';
import { LoginComponent } from './components/user/pages/login.component';
import { UserRegisterComponent } from './components/user/pages/user-register.component';
import { CategoryComponent } from './components/category/category.component';
import { CommonModule } from '@angular/common';
import { SaleitemDetailComponent } from './components/saleitem/saleitem-detail/saleitem-detail.component';
// import { SaleItemModule } from '../app/components/saleitem/saleitem.module'

@NgModule({
  declarations: [
    AppComponent,
    SaleitemViewComponent,    
    CategorySelectorComponent,
    LoginComponent,
    UserRegisterComponent,
    CategoryComponent,
    CategorySelectorComponent,
    SaleitemDetailComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(AppDataService, { delay: 1000 })
  ],
  exports: [
    CategoryComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
