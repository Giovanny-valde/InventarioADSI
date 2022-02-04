import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLoginService } from 'src/app/servicios/usuario-login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private rol:any;

  constructor(public router: Router, private usuarioLogin:UsuarioLoginService) { }

  ngOnInit(): void {
  }

  seguridad:any="";
  inventarioAprendiz:any="";
//cada vez que se cambie de ruta se ejecuta el ngDoCheck
  cambiarLink(link:any){
    link.style.backgroundColor='#fff';
    link.style.color='#000';
  }
  // ngDoCheck(): void {
  //   this.href = window.location.href;
  //   this.href.split('/');
  //   if(this.href.split('/')[4]=="seguridad"){
  //     this.seguridad=document.getElementById('seguridad');
  //     this.seguridad.style.backgroundColor='#fa4e0d';
  //     this.seguridad.style.color='#fff';
  //     this.cambiarLink(this.inventarioAprendiz);
  //     // this.inventarioAprendiz.style.backgroundColor='#fff';
  //     // this.inventarioAprendiz.style.color='#000';
  //   }else if(this.href.split('/')[4]=="inventario-aprendiz"){
  //     this.inventarioAprendiz=document.getElementById('inventarioAprendiz');
  //     this.inventarioAprendiz.style.backgroundColor='#fa4e0d';
  //     this.inventarioAprendiz.style.color='#fff';
  //     this.cambiarLink(this.seguridad);
  //     // this.seguridad.style.backgroundColor='#fff';
  //     // this.seguridad.style.color='#000';
  //   }

  //}

  public isRole(role:string){
    return this.router.url.includes(role);
  }
  public role(){
    let roles=this.usuarioLogin.getRol()?.split(",");
    let sax:any;
    this.rol=roles;
    this.rol.find(function (element:any){
      sax = element == "13";
    });
    return sax;
    // return roles?.filter(function(x:any){
    //   sax=x=="13" ? true : false;
    // })
  }

}
