import { Injectable } from '@angular/core';
import { Zona } from '../modelos/zona';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared-service';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  private path = this.sharedService.APIUrl+'/zona';

  constructor(private http:HttpClient,
    private sharedService:SharedService
  ){ }

  public listarTodos(){
    return this.http.get<Zona[]>(this.path+'/GetAllZona');
  }
  public listarPorId(id: number){
    return this.http.get<Zona>(this.path+'/GetZonaId?id='+id);
  }

  public registrar(zona: Zona){
    return this.http.post<void>(this.path+'/PostZona',zona);
  }

  public actualizar(zona: Zona){
    return this.http.put<void>(this.path+'/PutZona',zona);
  }

  public eliminar(id: number){
    return this.http.delete(this.path+'/DeleteZona?id='+id);
  }
}
