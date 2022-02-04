import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Elemento } from '../modelos/elemento';
 import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class ElementoService {

  private path = this.sharedService.APIUrl+'/Elemento';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Elemento[]>(this.path+'/GetAllElemento');
  }

 public listarPorId(id: number){
    return this.http.get<Elemento>(this.path+'/GetElementoId?id='+id);
  }

  public registrar(elemento: Elemento){
    return this.http.post<void>(this.path+'/PostElemento',elemento);
  }

  public actualizar(elemento: Elemento){
    return this.http.put<void>(this.path+'/PutElemento',elemento);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/DeleteElemento?id='+id);
  }
}
