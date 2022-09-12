import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { SalesService } from 'src/app/services/sales.service';
import { UtilService } from 'src/app/services/util.service';
import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.css']
})
export class CreateSaleComponent implements OnInit {
  customers: any = []
  products: any = []
  showResults: boolean = false;
  selectedId: any;
  salesByUser: any = [];
  total: number = 0;
 
  constructor(
    private _customerService: CustomersService, 
    private _utilsService: UtilService,
    private _saleService: SalesService,
    private _productService: ProductsService,
    private _router: Router
    ) 
    { }

  ngOnInit(): void {
    this._customerService.listCustomers().subscribe(
      (res) => {
        this.customers = res;
      },
      (err) =>{
        this._utilsService.openSnackBarError("Ha ocurrido un error al cargar los clientes")
      }
    )
    this._productService.listProducts().subscribe(
      (res) => {
        this.products = res;
        for (let i = 0; i < this.products.length; i++) {
          this.products[i].isSelected = false;
        }
      },
      (err) => {
        this._utilsService.openSnackBarError("Ha ocurrido un error al cargar los productos")
      }
    )
  }
  makeSale(){
    if(
      this.selectedId &&
      this.products.filter((product: any) => product.isSelected == true).length != 0
    ){
      let selectedProducts = this.products.filter((product: any) => product.isSelected == true)
      let selectedProductsIds: any = []
      selectedProducts.forEach((product: any) => {
        selectedProductsIds.push({"id": product.producto.id})
      });
      let data = {
        idCli: this.selectedId,
        items: selectedProductsIds
      }
      console.log(data);
      this._saleService.createSale(data).subscribe(
        (res) => {
          this._router.navigate(['/list-sales']);
          this._utilsService.openSnackBarSuccesfull("Venta Registrada con exito!");
        },
        (err) => {
          this._utilsService.openSnackBarError("Ha ocurrido un error al realizar la venta");
        }
      )
    } else {
      this._utilsService.openSnackBarError("Debe seleccionar al menos un producto y al cliente para realizar la venta");
    }
  }
  changeTotal(product: any){
    product.isSelected = !product.isSelected
    if(product.isSelected){
      this.total += product.producto.valor
    } else {
      this.total -= product.producto.valor
    }
  }
}
