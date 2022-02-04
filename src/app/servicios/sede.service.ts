import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sede } from '../modelos/sede';
import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  private path = this.sharedService.APIUrl+'/sede';

  constructor(private http:HttpClient, private sharedService:SharedService){ }

  public listarTodos(){
    return this.http.get<Sede[]>(this.path+'/GetAllSede');
  }

 public listarPorId(id: number){
    return this.http.get<Sede>(this.path+'/GetSedeId?id='+id);
  }

  public registrar(sede: Sede){
    return this.http.post<void>(this.path+'/PostSede',sede);
  }

  public actualizar(sede: Sede){
    return this.http.put<void>(this.path+'/PutSede',sede);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/DeleteSede?id='+id);
  }

}
