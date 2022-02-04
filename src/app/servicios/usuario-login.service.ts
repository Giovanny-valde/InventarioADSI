import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';

import { UsuarioRolService } from './usuario-rol.service';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioLoginService {

  constructor(
    private usuarioService:UsuarioService,
    private usuarioRolService:UsuarioRolService
  ) { }

  public getUsuario(){
    return localStorage.getItem('usuario');
  }

  public setUsuario(usuario:any){
    localStorage.setItem('usuario', usuario.Id);
  }
  public isLoggedIn(){
    return localStorage.getItem('usuario') != null;
  }

  public getRol(){
    return localStorage.getItem('rol');
  }
  public setRol(rol:any){
    localStorage.setItem('rol', rol);
  }
  public cerrarSesion(){
    localStorage.removeItem('rol');
    localStorage.removeItem('usuario');
  }

  /**
   * Metodo para retornar el usuario que se encuentra registrado en el sistema
   * @param usuarioLogin es el objeto que contiene el username y la clave del usuario
   * @returns Devuelve un observable del usuario solo si el usuario existe o no
   */
   public retornarUsuarios(usuarioLogin:any):Observable<any>{
    return this.usuarioService.listarTodos().pipe(
      map(
        (usuarioFilter:any)=>{
          return usuarioFilter.data.filter(
            (usuario:any)=>{
              return usuario.Username == usuarioLogin.username && usuario.Password == usuarioLogin.password;
            }
          );
        }
      )
    );
  }
  /**
   * Metodo para retornar los roles de un usuario
   * @param usuario Es el usuario que se van a buscar los roles
   * @returns Devuelve un observable con los roles del usuario
   */
  public retornarRoles(usuario:any):Observable<any>{
    return this.usuarioRolService.listarTodos().pipe(
      map(
        (role:any)=>{
          return role.data.filter(
            (rol:any)=>{
              return rol.Usuario.Id == usuario.Id;
            }
          );
        }
      )
    );
  }

  /**
   * Metodo para buscar usuario dependiendo de username y correo
   * @param user: objeto de user {username,correo}
   * @returns object
   */
  public buscarClave(user:any){
    return this.usuarioService.listarTodos().pipe(
      map(
        (dataReturn:any)=>{
          return dataReturn.data.filter(
            (dataFilter:any)=>{
              return dataFilter.Username==user.username && dataFilter.PersonaDTO.Email == user.correo;
            }
          )
        }
      )
    )
  }

}
