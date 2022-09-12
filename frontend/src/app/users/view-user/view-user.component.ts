import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  data: any = {};

  constructor(
    private _usersService: UsersService,
    private _utils: UtilService
  ) { }

  ngOnInit(): void {
    this._usersService.getUser().subscribe(
      (res) => {
        this.data = res;
      },
      (err) => {
        console.log(err);        
      }
    )
  }

  updateUsuario(){
    if(
      this.data.nombre &&
      this.data.apellidos &&
      this.data.email &&
      this.data.password
    ){

      this._usersService.updateUser(this.data).subscribe(
        (res) => {
          this._utils.openSnackBarSuccesfull("Usuario actualizado exitosamente")  
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
