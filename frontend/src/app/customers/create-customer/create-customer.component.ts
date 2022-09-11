import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  customer: any = {};
  constructor(
    private _customerService: CustomersService,
    private _router: Router,
    private _utilsService: UtilService
  ) {}

  ngOnInit(): void {}
  createCustomer(){
    if(
      this.customer.nombre &&
      this.customer.apellidos &&
      this.customer.email &&
      this.customer.telefono &&
      this.customer.documento
    ){
      this._customerService.createCustomer(this.customer).subscribe(
        (res) => {
          this._router.navigate(['/list-customers'])
          this._utilsService.openSnackBarSuccesfull("Cliente creado exitosamente");
        },
        (err) => {
          this._utilsService.openSnackBarError(err);
        }
      );
    }
    else
    {
      this._utilsService.openSnackBarError("Todos los campos son obligatorios")
    }
  }
}
