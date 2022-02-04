import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Toastr {

  constructor(private http:HttpClient,
    private toastr:ToastrService
     )
   { }

    public  bien(title:string, cuerpo:string) {
      this.toastr.success(cuerpo, title, {
          progressBar	 : true,
          progressAnimation:'increasing',
        });
   }
   public  mal(title:string, cuerpo:string) {
    this.toastr.error(cuerpo, title, {
        progressBar	 : true,
        progressAnimation:'increasing',
      });
 }

}

