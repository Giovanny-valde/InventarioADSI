import { Injectable } from '@angular/core';
import { Jornada } from '../modelos/jornada';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {
  private path = this.sharedService.APIUrl+'/jornada';

  constructor(private http:HttpClient,
    private sharedService:SharedService
  ){}

  public listarTodos(){
    return this.http.get<Jornada[]>(this.path+'/GetAllJornada');
  }

 public listarPorId(id: number){
    return this.http.get<Jornada>(this.path+'/GetJornadaId?id='+id);
  }

  public registrar(jornada: Jornada){
    return this.http.post<void>(this.path+'/PostJornada',jornada);
  }

  public actualizar(jornada: Jornada){
    return this.http.put<void>(this.path+'/PutJornada',jornada);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/DeleteJornada?id='+id);
  }
}
