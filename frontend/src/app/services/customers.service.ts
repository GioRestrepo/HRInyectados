import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  env: String;
  constructor(private _httpClient: HttpClient) { 
    this.env = environment.urlAPI;
  }
  createCustomer(data: any){
    return this._httpClient.post<any>(`${this.env}clientes`, data);
  }
  listCustomers(id: number = 0){
    return this._httpClient.get<any>(
      `${this.env}clientes/${
        id != 0
          ? id 
          : ''
      }`
    );
  }
}
