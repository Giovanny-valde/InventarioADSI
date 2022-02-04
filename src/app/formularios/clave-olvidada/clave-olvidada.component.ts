import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuarioLoginService } from 'src/app/servicios/usuario-login.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-clave-olvidada',
  templateUrl: './clave-olvidada.component.html',
  styleUrls: ['./clave-olvidada.component.css']
})
export class ClaveOlvidadaComponent implements OnInit {

  public claveOlvidadaForm!: FormGroup;

  constructor(private f:FormBuilder, private usuarioLogin:UsuarioLoginService, private usuarioS:UsuarioService){
    this.claveOlvidadaForm = this.f.group({
      username: ['', Validators.required],
      correo: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }

  public recuperarClave(){
    let user = {
      username: this.claveOlvidadaForm.controls.username.value,
      correo: this.claveOlvidadaForm.controls.correo.value
    }
    this.usuarioLogin.buscarClave(user).subscribe((res:any) => {
      //console.log(res);
      //let act:Usuario = new Usuario();
      //act.password=res[0].PersonaDTO.Documento;
      //act.id=res[0].Id;
      // let act2:Usuario=new Usuario();
      // act2 = res[0];
      // act2.password=res[0].Username;
      // console.log(act2);
      let act3=res[0];
      act3.Password=res[0].Username;
      console.log(act3);
      this.usuarioS.actualizar(act3).subscribe((res:any) => {
         console.log('actualizado '+res);
       });
    })
  }

}
