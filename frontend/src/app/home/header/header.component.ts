import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  tokenExist(){
    let token = localStorage.getItem("token");
    return token == undefined ? true : false;
  }
  salir(){
    localStorage.removeItem('token');
  }
}
