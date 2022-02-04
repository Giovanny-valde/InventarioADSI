import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/servicios/rol.service';
import { UsuarioLoginService } from 'src/app/servicios/usuario-login.service';

@Component({
  selector: 'app-sidebar-aprendiz',
  templateUrl: './sidebar-aprendiz.component.html',
  styleUrls: ['./sidebar-aprendiz.component.css']
})
export class SidebarAprendizComponent implements OnInit {

  public cantidadRoles:any=[];
  public roles:any=[];

  constructor(
    private usuariologin:UsuarioLoginService,
    private rol:RolService
  ) { }
  ngOnInit(): void {
    this.usuarioRol();
  }
  public cantidadRole(){
    let cantidad=this.usuariologin.getRol();
    let cantidadRoles=cantidad?.split(',').length? cantidad.split(',').length>1 : 0;
    return cantidadRoles;
  }
  public usuarioRol(){
    let cantidad=this.usuariologin.getRol();
    let cantidadRoles=cantidad?.split(',');
    this.cantidadRoles=cantidadRoles;
    for(let i=0;i<this.cantidadRoles.length;i++){
      this.rol.listarPorId(this.cantidadRoles[i]).subscribe(
        (data:any)=>{
          this.roles.push(data.data.Nombre);
        }
      );
    }
  }
}
