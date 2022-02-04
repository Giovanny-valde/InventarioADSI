import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Toastr } from 'src/app/material/toastr.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioRol } from 'src/app/modelos/usuario-rol';
import { UsuarioRolService } from 'src/app/servicios/usuario-rol.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import { RolService } from 'src/app/servicios/rol.service';

@Component({
  selector: 'app-guardar-usuario-rol',
  templateUrl: './guardar-usuario-rol.component.html',
  styleUrls: ['./guardar-usuario-rol.component.css']
})
export class GuardarUsuarioRolComponent implements OnInit {

  public formusuariorol!: FormGroup;
  public listaUsuarioRol!: any; // lista de usuarios-rol
  public usuarioRol: any = [];

  //Lista de usuarios
  public listaUsuarios!: any;
  public usuario: any = [];

  //Lista de roles
  public listaRoles!: any;
  public rol: any = [];

  constructor(
    private toastr: Toastr,
    private fb: FormBuilder,
    private servicioUsuarioRol: UsuarioRolService,
    private servicioUsuario: UsuarioService,
    private servicioRol: RolService,
    public dialogRef: MatDialogRef < GuardarUsuarioRolComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.listarUsuario();
    this.listarRoles();
    if (this.data.id != 0) {
      this.listarporid(this.data.id);
    }
  }

  public listarUsuario() {
    this.servicioUsuario.listarTodos().subscribe(res => {
      this.usuario.json = res;
      this.listaUsuarios = this.usuario.json.data;
    });
  }

  public listarRoles() {
    this.servicioRol.listarTodos().subscribe(res => {
      this.rol.json = res;
      this.listaRoles = this.rol.json.data;
    });
  }

  crearFormulario() {
    this.formusuariorol = this.fb.group({
      id: [''],
      username: [null, Validators.required],
      rol: [null, Validators.required],
      activo: [null, Validators.required],
    });
  }

  public guardar() {
    let usuarioRol: UsuarioRol = new UsuarioRol();
    usuarioRol.idUsuario = this.formusuariorol.controls['username'].value;
    usuarioRol.idRol = this.formusuariorol.controls['rol'].value;
    //  if(this.data.id == 0){
    this.registarUsuarioRol(usuarioRol);
    //  }
    //    else{
    //          //     usuarioRol.id=this.data.id;
    //          //     this.actualizarUsuarioRol(usuarioRol)
    // };
  }

  public registarUsuarioRol(usuarioRol: UsuarioRol) {
    this.servicioUsuarioRol.registrar(usuarioRol).subscribe(res => {
      this.dialogRef.close();
      this.toastr.bien("Registro Exitoso", "¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar", "ERROR");
    });
  }

  // public actualizarUsuarioRol(usuarioRol: UsuarioRol) {
  //   this.servicioUsuarioRol.actualizar(usuarioRol).subscribe(res => {
  //     this.dialogRef.close(true);
  //     this.toastr.bien("Actulizacion Exitosa", "¡¡EXITO!!");
  //   }, error => {
  //     this.toastr.mal("Ha ocurrido un error al actualizar", "ERROR");
  //   });
  // }

  public listarporid(id: number) {
    this.servicioUsuarioRol.listarPorId(id).subscribe(res => {
      this.toastr.bien("Consulta Exitosa", "¡¡EXITO!!");
      this.usuarioRol.json = res;
      // this.formusuariorol.controls['id'].setValue(this.data.Id);
      this.formusuariorol.controls['username'].setValue(this.usuarioRol.json.data.Usuario.Id)
      this.formusuariorol.controls['rol'].setValue(this.usuarioRol.json.data.Rol.Id);
      this.formusuariorol.controls['activo'].setValue(this.usuarioRol.json.data.Activo);
    }, error => {
      this.toastr.mal("Ha ocurrido un error al listar", "ERROR");
    });
  }

}
