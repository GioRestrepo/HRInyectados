import { Component, OnInit } from '@angular/core';
import { WarehousesService } from 'src/app/services/warehouses.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-list-warehouses',
  templateUrl: './list-warehouses.component.html',
  styleUrls: ['./list-warehouses.component.css']
})
export class ListWarehousesComponent implements OnInit {
  WareHouse: any = [];
  constructor(
    private _WareHouseService: WarehousesService,
    private _utilsService: UtilService
  ) { }

  ngOnInit(): void {
    this._WareHouseService.listWareHouses().subscribe(
      (res) => {
        this.WareHouse = res;
      },
      (err) => {
        this._utilsService.openSnackBarError(err);
      }
    )
  }
  updateWareHouse(id: number){
      //delete user
    console.log(id); 
  }
  deleteWareHouse(id: number){
     //update user
    console.log(id); 
  }

}
