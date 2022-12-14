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
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';



//services
import { UsersService } from './services/users.service';
import { UtilService } from './services/util.service';
import { CustomersService } from './services/customers.service';
import { WarehousesService } from './services/warehouses.service';
import { ProductsService } from './services/products.service';
import { SalesService } from './services/sales.service';
import { TokenInterceptorService } from "./services/token-interceptor.service";

//guard
import { AuthGuard } from "./guard/auth.guard";

import { ListCustomerComponent } from './customers/list-customer/list-customer.component';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './customers/update-customer/update-customer.component';
import { MainComponent } from './home/main/main.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { UpdateWarehouseComponent } from './warehouses/update-warehouse/update-warehouse.component';

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
    CreateSaleComponent,
    ListCustomerComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent,
    MainComponent,
    UpdateProductComponent,
    UpdateWarehouseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    UsersService,
    UtilService,
    CustomersService,
    WarehousesService,
    ProductsService,
    SalesService,
    TokenInterceptorService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
