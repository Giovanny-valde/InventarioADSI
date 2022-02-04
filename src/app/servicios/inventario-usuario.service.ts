import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventarioUsuario } from '../modelos/inventario-usuario';
 import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class InventarioUsuarioService {

  private path = this.sharedService.APIUrl+'/InventarioUsuario';

  constructor(private http:HttpClient, private sharedService:SharedService){ }

  public listarTodos(){
    return this.http.get<InventarioUsuario[]>(this.path+'/GetAllInventarioUsuario');
  }

 public listarPorId(id: number){
    return this.http.get<InventarioUsuario>(this.path+'/GetInventarioUsuarioId?id='+id);
  }

  public registrar(inventarioUsuario: InventarioUsuario){
    return this.http.post<void>(this.path+'/PostInventarioUsuario',inventarioUsuario);
  }

  public actualizar(inventarioUsuario: InventarioUsuario){
    return this.http.put<void>(this.path+'/PutInventarioUsuario',inventarioUsuario);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/DeleteInventarioUsuario?id='+id);
  }
}
