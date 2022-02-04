import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioLoginService } from 'src/app/servicios/usuario-login.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  public formlogin!: FormGroup;
  public errorhtml!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioLoginService: UsuarioLoginService
    ) {
    this.formlogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.usuarioLoginService.isLoggedIn()){
      this.router.navigate(['/vista']);
    }
  }

  public verificarUsuario() {
    let usuario={
      username: this.formlogin.controls.email.value,
      password: this.formlogin.controls.password.value
    }
    let rolesArray: string[] = [];
    this.usuarioLoginService.retornarUsuarios(usuario).subscribe(
      (usuarios: any) => {
        if (usuarios.length > 0) {
          let usuarioActual=usuarios[0];
          this.usuarioLoginService.setUsuario(usuarioActual);
          this.usuarioLoginService.retornarRoles(usuarioActual).subscribe(
            (roles: any) => {
              if(roles.length>0){
                if(roles.length>1){
                  for(let i=0; i<roles.length;i++){
                    rolesArray.push(roles[i].Rol.Id);
                  }
                  this.usuarioLoginService.setRol(rolesArray);
                  console.log(this.usuarioLoginService.getRol());
                }else{
                  let rolActual=roles[0];
                  this.usuarioLoginService.setRol(rolActual.Rol.Id);
                }
                this.router.navigate(['/vista']);
              }else{
                this.errorhtml="Usuario sin rol asignado";
              }
            }
          );
        }else{
          this.errorhtml="Usuario o contraseña incorrectos";
        }
      }
    );
  }

}
