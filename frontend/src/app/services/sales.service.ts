import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  env: String;
  constructor(private _httpClient: HttpClient) { 
    this.env = environment.urlAPI;
  }
  createSale(data: any){
    return this._httpClient.post<any>(`${this.env}ventas`, data);
  }
  listSale(id: number = 0){
    return this._httpClient.get<any>(
      `${this.env}ventas/${
        id != 0
          ? id 
          : ''
      }`
    );
  }
}
