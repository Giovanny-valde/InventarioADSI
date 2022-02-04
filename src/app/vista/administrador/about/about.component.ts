import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public ver!: Number ;
  constructor() { }

  ngOnInit(): void {
    this.ver=0;
  }

  public cambiar(ver: number){
    this.ver=ver
  }
}
