import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventarioDetalle } from '../modelos/inventario-detalle';
import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class InventarioDetalleService {

  private path = this.sharedService.APIUrl+'/InventarioDetalle';

  constructor(private http:HttpClient, private sharedService:SharedService){ }

  public listarTodos(){
    return this.http.get<InventarioDetalle[]>(this.path+'/GetAllInventarioDetalle');
  }

 public listarPorId(id: number){
    return this.http.get<InventarioDetalle>(this.path+'/GetInventarioDetalleId?id='+id);
  }

  public registrar(inventarioUsuario: InventarioDetalle){
    return this.http.post<void>(this.path+'/PostInventarioDetalle',inventarioUsuario);
  }

  public actualizar(inventarioUsuario: InventarioDetalle){
    return this.http.put<void>(this.path+'/PutInventarioDetalle',inventarioUsuario);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/DeleteInventarioDetalle?id='+id);
  }
}
