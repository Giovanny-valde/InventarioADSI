import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../modelos/empresa';
import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private path = this.sharedService.APIUrl+'/empresa';

  constructor(private http:HttpClient, private sharedService:SharedService) { }

  public listarTodos(){
    return this.http.get<Empresa[]>(this.path+'/GetAllEmpresa');
  }

 public listarPorId(id: number){
    return this.http.get<Empresa>(this.path+'/GetEmpresaId?id='+id);
  }

  public registrar(empresa: Empresa){
    return this.http.post<void>(this.path+'/PostEmpresa',empresa);
  }

  public actualizar(empresa: Empresa){
    return this.http.put<void>(this.path+'/PutEmpresa',empresa);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/DeleteEmpresa?id='+id);
  }

}
