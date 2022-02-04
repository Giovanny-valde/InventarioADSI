import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../modelos/persona';
import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private path = this.sharedService.APIUrl+'/Persona';

  constructor(private http:HttpClient,
    private sharedService:SharedService
  ){ }

  public listarTodos(){
    return this.http.get<Persona[]>(this.path+'/GetAllPersona');
  }

 public listarPorId(id: number){
    return this.http.get<Persona>(this.path+'/GetPersonaId?id='+id);
  }

  public registrar(persona: Persona){
    return this.http.post<void>(this.path+'/PostPersona',persona);
  }

  public actualizar(persona: Persona){
    return this.http.put<void>(this.path+'/PutPersona',persona);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/DeletePersona?id='+id);
  }


}
