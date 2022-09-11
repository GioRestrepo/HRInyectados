import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
   products: any = [];
  constructor(
    private _productService: ProductsService,
    private _utilsService: UtilService) 
    { }
    
  ngOnInit(): void {
    this._productService.listProducts().subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        this._utilsService.openSnackBarError(err);
      }
    );
  }

  deleteproduct(id: number){
    //delete user
    console.log(id);    
  }

  updateproduct(id: number){
    //update user
    console.log(id);    
  }

}
