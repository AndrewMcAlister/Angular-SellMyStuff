import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppDataService } from './services/app-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category/category.component';
/* Feature Modules */
import { UserModule } from '../app/components/user/user.module';
import { SaleItemModule } from '../app/components/saleitem/saleitem.module';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(AppDataService, { delay: 1000 }),
    UserModule,
    SaleItemModule
  ],
  exports: [
    CategoryComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
