import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  env: String;
  constructor(private _httpClient: HttpClient) { 
    this.env = environment.urlAPI;
  }
  createUser(data: any){
    return this._httpClient.post<any>(`${this.env}usuarios`, data);
  }
  updateUser(data: any){
    return this._httpClient.put<any>(`${this.env}usuarios`, data);
  }
  login(data: any){
    return this._httpClient.post<any>(`${this.env}usuarios/login`, data);
  }
  getUser(){
    return this._httpClient.get<any>(`${this.env}usuarios`);
  }
  getToken(){
    return localStorage.getItem('token')
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
