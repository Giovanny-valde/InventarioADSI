import { UsuarioLoginService } from 'src/app/servicios/usuario-login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-administrador',
  templateUrl: './navbar-administrador.component.html',
  styleUrls: ['./navbar-administrador.component.css']
})
export class NavbarAdministradorComponent implements OnInit {

  constructor(
    private usuarioLogin:UsuarioLoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  public cerrarSesion(){
    this.usuarioLogin.cerrarSesion();
    this.router.navigate(['']);
  }


}
