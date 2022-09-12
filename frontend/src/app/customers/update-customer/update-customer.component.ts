import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],
})
export class UpdateCustomerComponent implements OnInit {
  customer: any = {};
  constructor(
    private _activeRoute: ActivatedRoute,
    private _customerService: CustomersService,
    private _router: Router,
    private _utilsService: UtilService
  ) {}

  ngOnInit(): void {}
  createCustomer() {
    if (
      this.customer.nombre &&
      this.customer.apellidos &&
      this.customer.email &&
      this.customer.telefono &&
      this.customer.documento
    ) {
      this._customerService.updateCustomer(this._activeRoute.snapshot.params.id, this.customer).subscribe(
        (res) => {
          this._router.navigate(['/list-customers']);
          this._utilsService.openSnackBarSuccesfull(
            'Cliente actualizado exitosamente'
          );
        },
        (err) => {
          this._utilsService.openSnackBarError(err);
        }
      );
    } else {
      this._utilsService.openSnackBarError('Todos los campos son obligatorios');
    }
  }
}
