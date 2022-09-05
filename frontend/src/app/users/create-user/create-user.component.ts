import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  data: any = {};

  constructor(
    private _usersService: UsersService,
    private _utils: UtilService
  ) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    if(
      this.data.nombre &&
      this.data.apellidos &&
      this.data.email &&
      this.data.password
    ){

      this._usersService.createUser(this.data).subscribe(
        (res) => {
          this._utils.openSnackBarSuccesfull("Usuario registrado exitosamente")
          console.log(res);
          this.data = {}    
        },
        (err) =>{
          this._utils.openSnackBarError(err)
        }
      );
    } else {
      this._utils.openSnackBarError("campos incompletos!")
    }
  }
}
