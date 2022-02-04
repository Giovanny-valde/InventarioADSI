import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLoginService } from 'src/app/servicios/usuario-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private rol:any;

  constructor(public router: Router, private usuarioLogin:UsuarioLoginService) { }

  ngOnInit(): void {
  }
  toggle:any="";
  navbar:any="";
  body:any="";
  header:any="";
  footer:any="";
  version:any="";

  showHideSideBar(toggleid: any, navbarid: any, bodyid: any, headerid: any,footerid:any,versionid:any) {
    
    this.toggle = document.getElementById(toggleid);
    this. navbar = document.getElementById(navbarid);
    this.body = document.getElementById(bodyid);
    this. header = document.getElementById(headerid);
    this.footer=document.getElementById(footerid);
    this.version=document.getElementById(versionid);

        // show navbar
        if(this.navbar.style.width=="280px"){
          this.navbar.style.width="65px";
          this.toggle.style.marginLeft="0";
          this.toggle.style.transition="all 0.5s";
          this.body.style.marginLeft="0";
          this.footer.style.marginLeft="0";
          this.footer.style.transition="all 0.5s";
          this.version.style.marginLeft="0";

        }else{
          this.toggle.style.transition="all 0.5s";
          this.toggle.style.marginLeft="65px";
          this.navbar.style.width="280px";
          this.body.style.marginLeft="65px";
          this.footer.style.transition="all 0.5s";
          this.footer.style.marginLeft="200px";
          this.version.style.marginLeft="-150px";

        }
        // add padding to body
        this.body.classList.toggle('body-pd')
        // add padding to header
        this.header.classList.toggle('body-pd');
  }
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
