import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { LoginComponent } from './users/login/login.component';
import { ViewUserComponent } from './users/view-user/view-user.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { CreateProductsComponent } from './products/create-products/create-products.component';
import { CreateWarehousesComponent } from './warehouses/create-warehouses/create-warehouses.component';
import { ListWarehousesComponent } from './warehouses/list-warehouses/list-warehouses.component';
import { ListSalesComponent } from './sales/list-sales/list-sales.component';

import { CreateSaleComponent } from './sales/create-sale/create-sale.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateUserComponent,
    LoginComponent,
    ViewUserComponent,
    ListProductsComponent,
    CreateProductsComponent,
    CreateWarehousesComponent,
    ListWarehousesComponent,
    ListSalesComponent,
    CreateSaleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
