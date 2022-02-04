import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../modelos/rol';
import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class RolService {


  private path = this.sharedService.APIUrl+'/Rol';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Rol[]>(this.path+'/GetAllRol');
  }

 public listarPorId(id: number){
    return this.http.get<Rol>(this.path+'/GetRolId?id='+id);
  }

  public registrar(rol: Rol){
    return this.http.post<void>(this.path+'/PostRol',rol);
  }

  public actualizar(rol: Rol){
    return this.http.put<void>(this.path+'/PutRol',rol);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/DeleteRol?id='+id);
  }

}
