import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accion } from '../modelos/accion';
import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class AccionService {

  private path = this.sharedService.APIUrl+'/accion';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Accion[]>(this.path+'/GetAllAccion');
  }

 public listarPorId(id: number){
    return this.http.get<Accion>(this.path+'/GetAccionId?id='+id);
  }

  public registrar(accion: Accion){
    return this.http.post<void>(this.path+'/PostAccion',accion);
  }

  public actualizar(accion: Accion){
    return this.http.put<void>(this.path+'/PutAccion',accion);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/DeleteAccion?id='+id);
  }
}

