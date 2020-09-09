import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { AppComponent } from './app.component';
import { SaleitemViewComponent } from './components/saleitem/saleitem-view/saleitem-view.component';
import { AppRoutingModule } from './app-routing.module';
import { CategorySelectorComponent } from './components/shared/category/category-selector/category-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppDataService } from './services/app-data.service';
import { LoginComponent } from './components/user/pages/login.component';
import { UserRegisterComponent } from './components/user/pages/user-register.component';
import { CategoryComponent } from './components/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    SaleitemViewComponent,
    CategorySelectorComponent,
    LoginComponent,
    UserRegisterComponent,
    CategoryComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(AppDataService, { delay: 1000 })  ,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
