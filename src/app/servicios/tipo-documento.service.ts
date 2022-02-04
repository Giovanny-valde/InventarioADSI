import { Injectable } from '@angular/core';
import { TipoDocumento } from '../modelos/tipo-documento';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
    private path = this.sharedService.APIUrl+'/TipoDocumento';

    constructor(private http:HttpClient,
      private sharedService:SharedService
    ){ }

    public listarTodos(){
      return this.http.get<TipoDocumento[]>(this.path+'/GetAllTipoDocumento');
    }

   public listarPorId(id: number){
      return this.http.get<TipoDocumento>(this.path+'/GetTipoDocumentoId?id='+id);
    }

    public registrar(tipoDocumento: TipoDocumento){
      return this.http.post<TipoDocumento>(this.path+'/PostTipoDocumento',tipoDocumento);
    }

    public actualizar(tipoDocumento: TipoDocumento){
      return this.http.put<void>(this.path+'/PutTipoDocumento',tipoDocumento);
    }

    public eliminar(id: number){
      return this.http.delete<void>(this.path+'/DeleteTipoDocumento?id='+id);
    }

}
