import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ambiente } from '../modelos/ambiente';
import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class AmbienteService {

  private path = this.sharedService.APIUrl+'/Ambiente';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Ambiente[]>(this.path+'/GetAllAmbiente');
  }

 public listarPorId(id: number){
    return this.http.get<Ambiente>(this.path+'/GetAmbienteId?id='+id);
  }

  public registrar(ambiente: Ambiente){
    return this.http.post<void>(this.path+'/PostAmbiente',ambiente);
  }

  public actualizar(ambiente: Ambiente){
    return this.http.put<void>(this.path+'/PutAmbiente',ambiente);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/DeleteAmbiente?id='+id);
  }
}
