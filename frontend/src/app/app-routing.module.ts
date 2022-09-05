import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductsComponent } from './products/create-products/create-products.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { CreateSaleComponent } from './sales/create-sale/create-sale.component';
import { ListSalesComponent } from './sales/list-sales/list-sales.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { LoginComponent } from './users/login/login.component';
import { ViewUserComponent } from './users/view-user/view-user.component';
import { CreateWarehousesComponent } from './warehouses/create-warehouses/create-warehouses.component';
import { ListWarehousesComponent } from './warehouses/list-warehouses/list-warehouses.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'create-product',
    component: CreateProductsComponent,
    pathMatch: 'full',
  },
  {
    path: 'list-products',
    component: ListProductsComponent,
    pathMatch: 'full',
  },
  {
    path: 'create-sale',
    component: CreateSaleComponent,
    pathMatch: 'full',
  },
  {
    path: 'list-sales',
    component: ListSalesComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    pathMatch: 'full',
  },
  {
    path: 'view-user',
    component: ViewUserComponent,
    pathMatch: 'full',
  },
  {
    path: 'create-warehouses',
    component: CreateWarehousesComponent,
    pathMatch: 'full',
  },
  {
    path: 'list-warehouses',
    component: ListWarehousesComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
