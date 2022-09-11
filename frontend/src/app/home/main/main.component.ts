import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    !this.tokenExist() 
      ? this._router.navigate(['/list-products'])
      : "";
  }

  tokenExist(){
    let token = localStorage.getItem("token");
    return token == undefined ? true : false;
  }
}
