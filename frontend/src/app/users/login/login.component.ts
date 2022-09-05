import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any = {}

  constructor(
    private _usersService: UsersService,
    private _utils: UtilService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }
  loggear(){
    if(this.data.email && this.data.password){
      this._usersService.login(this.data).subscribe(
        (res) => {
          localStorage.setItem("token", res.jwtToken);
          this._router.navigate(['/list-products']);
          this._utils.openSnackBarSuccesfull("login exitoso!")
        },
        (err) => {
          this._utils.openSnackBarError(err);
        }
      )
    } else {
      this._utils.openSnackBarError("todos los campos son obligatorios");
    }
  }
}
