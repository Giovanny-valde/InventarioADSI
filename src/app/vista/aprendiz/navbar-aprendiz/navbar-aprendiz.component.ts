import { UsuarioLoginService } from 'src/app/servicios/usuario-login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-aprendiz',
  templateUrl: './navbar-aprendiz.component.html',
  styleUrls: ['./navbar-aprendiz.component.css']
})
export class NavbarAprendizComponent implements OnInit {

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
