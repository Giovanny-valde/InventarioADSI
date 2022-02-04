import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioRol } from '../modelos/usuario-rol';
import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRolService {

  private path = this.sharedService.APIUrl+'/UsuarioRol';

  constructor(
    private http:HttpClient,
    private sharedService:SharedService
  ){ }

  public listarTodos(){
    return this.http.get<UsuarioRol[]>(this.path+'/GetAllUsuarioRol');
  }
  public listarPorId(id: number){
    return this.http.get<UsuarioRol>(this.path+'/GetUsuarioRolId?id='+id);
  }

  public registrar(usuarioRol: UsuarioRol){
    return this.http.post<void>(this.path+'/PostUsuarioRol',usuarioRol);
  }

  public actualizar(usuarioRol: UsuarioRol){
    return this.http.put<void>(this.path+'/PutUsuarioRol',usuarioRol);
  }

  public eliminar(id: number){
    return this.http.delete(this.path+'/DeleteUsuarioRol?id='+id);
  }
}
