import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css'],
})
export class ListCustomerComponent implements OnInit {
  customers: any = [];
  constructor(
    private _customerService: CustomersService,
    private _utilsService: UtilService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._customerService.listCustomers().subscribe(
      (res) => {
        this.customers = res;
      },
      (err) => {
        this._utilsService.openSnackBarError(err);
      }
    );
  }

  deleteCustomer(id: number){
    console.log(id);
    
    this._customerService.deleteCustomer(id).subscribe(
      (res) => {
        this._utilsService.openSnackBarSuccesfull("Cliente eliminado con exito");
        this.customers = this.customers.filter((customer: any) => customer.id != id);
      },
      (err) => {
        this._utilsService.openSnackBarError("Ha ocurrido un error al eliminar el cliente, puede que este se encuentre asociado a una venta");
      }
    )
  }

  updateCustomer(id: number){
    this._router.navigate([`/update-customer/${id}`]);
  }
}
