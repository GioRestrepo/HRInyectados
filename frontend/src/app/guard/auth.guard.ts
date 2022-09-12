import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _usersService: UsersService, private _router: Router){}

  canActivate(): boolean {
    if (!this._usersService.loggedIn()){
      this._router.navigate(['/']);
      return false;
    }else{
      return true;
    }
  }
}
