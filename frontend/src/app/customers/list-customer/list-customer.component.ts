import { Component, OnInit } from '@angular/core';
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
    private _utilsService: UtilService
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
    //delete user
    console.log(id);    
  }

  updateCustomer(id: number){
    //update user
    console.log(id);    
  }
}
