import { Injectable } from '@angular/core';
import { Inventario } from '../modelos/inventario';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private path = this.sharedService.APIUrl+'/Inventario';

  constructor(
    private http:HttpClient,
    private sharedService:SharedService
  ){}

  public listarTodos(){
    return this.http.get<Inventario[]>(this.path+'/GetAllInventario');
  }

 public listarPorId(id: number){
    return this.http.get<Inventario>(this.path+'/GetInventarioId?id='+id);
  }

  public registrar(inventario: Inventario){
    return this.http.post<void>(this.path+'/PostInventario',inventario);
  }

  public actualizar(inventario:Inventario){
    return this.http.put<void>(this.path+'/PutInventario',inventario);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/DeleteInventario?id='+id);
  }

}
