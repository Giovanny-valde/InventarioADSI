import { UsuarioLoginService } from './../servicios/usuario-login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {

  constructor(
    private usuarioLogin:UsuarioLoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

}
