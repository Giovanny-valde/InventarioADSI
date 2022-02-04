import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private path = this.sharedService.APIUrl+'/Usuario';

  constructor(private http:HttpClient,
    private sharedService:SharedService
  ){ }

  public listarTodos(){
    return this.http.get<Usuario[]>(this.path+'/GetAllUsuario');
  }
  public listarPorId(id: number){
    return this.http.get<Usuario>(this.path+'/GetUsuarioId?id='+id);
  }

  public registrar(usuario: Usuario){
    return this.http.post<void>(this.path+'/PostUsuario',usuario);
  }

  public actualizar(usuario: Usuario){
    return this.http.put<void>(this.path+'/PutUsuario',usuario);
  }

  public eliminar(id: number){
    return this.http.delete(this.path+'/DeleteUsuario?id='+id);
  }
}
