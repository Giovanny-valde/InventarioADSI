import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { RolService } from 'src/app/servicios/rol.service';
import { UsuarioLoginService } from 'src/app/servicios/usuario-login.service';

@Component({
  selector: 'app-sidebar-administrador',
  templateUrl: './sidebar-administrador.component.html',
  styleUrls: ['./sidebar-administrador.component.css']
})
export class SidebarAdministradorComponent implements OnInit {

  public cantidadRoles:any=[];
  public roles:any=[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuariologin:UsuarioLoginService,
    private rol:RolService
    ) { }

  ngOnInit(): void {
    this.usuarioRol();
  }

  persona(){
    this.router.navigate(['persona'], {relativeTo:this.route});
  }

  usuario(){
    this.router.navigate(['usuario'], {relativeTo:this.route});
  }

  public  ASP() {
    this.router.navigate(['seguridad'],{relativeTo:this.route});
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
