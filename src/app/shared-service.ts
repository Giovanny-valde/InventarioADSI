import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService  {

  readonly APIUrl="https://inventarioadsi.gcsof.com/api";

  //api local
    //readonly APIUrl="http://localhost:9000/api";

  constructor() { }


}
