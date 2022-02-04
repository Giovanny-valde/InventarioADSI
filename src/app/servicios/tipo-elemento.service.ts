import { Injectable } from '@angular/core';
import { TipoElemento } from '../modelos/tipo-elemento';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class TipoElementoService {

  private path = this.sharedService.APIUrl+'/TipoElemento';

  constructor(private http:HttpClient,
    private sharedService:SharedService)
   { }

  public listarTodos(){
    return this.http.get<TipoElemento[]>(this.path+'/GetAllTipoElemento');
  }
  public listarPorId(id: number){
    return this.http.get<TipoElemento>(this.path+'/GetTipoElementoId?id='+id);
  }

  public registrar(tipoElemento: TipoElemento){
    return this.http.post<void>(this.path+'/PostTipoElemento',tipoElemento);
  }

  public actualizar(tipoElemento: TipoElemento){
    return this.http.put<void>(this.path+'/PutTipoElemento',tipoElemento);
  }

  public eliminar(id: number){
    return this.http.delete(this.path+'/DeleteTipoElemento?id='+id);
  }

}
