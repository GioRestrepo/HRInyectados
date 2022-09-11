import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehousesService {
  env: String;
  constructor(private _httpClient: HttpClient) {
    this.env = environment.urlAPI;
   }
   
   createWareHouses(data: any){
    return this._httpClient.post<any>(`${this.env}bodegas`, data);
  }
  listWareHouses(id: number = 0){
    return this._httpClient.get<any>(
      `${this.env}bodegas/${
        id != 0
          ? id 
          : ''
      }`
    );
  }
}
