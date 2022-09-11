import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.css']
})
export class ListSalesComponent implements OnInit {
  customers: any = []
  showResults: boolean = false;
  selectedId: any;
  salesByUser: any = [];
  constructor(private _customerService: CustomersService, private _utilsService: UtilService) { }

  ngOnInit(): void {
    this._customerService.listCustomers().subscribe(
      (res) => {
        this.customers = res;
      },
      (err) =>{
        this._utilsService.openSnackBarError("Ha ocurrido un error al cargar los clientes")
      }
    )
  }

  searchSalesByCustomer(id: any){
    console.log(id);
    
  }

}
