import { Toastr } from 'src/app/material/toastr.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/modelos/usuario';
import { PersonaService } from 'src/app/servicios/persona.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { RolService } from 'src/app/servicios/rol.service';
import { UsuarioLoginService } from 'src/app/servicios/usuario-login.service';

@Component({
  selector: 'app-guardar-usuario',
  templateUrl: './guardar-usuario.component.html',
  styleUrls: ['./guardar-usuario.component.css']
})
export class GuardarUsuarioComponent implements OnInit {

  public formusuario!: FormGroup;
  public listaUsuario!: any ;  // lista de usuarios
  public usuario: any=[] ;
  public idusuario! : number;
  public listaPersona!: any ;  // lista de sedes
  public persona: any=[] ;


  public idPersona: any=[];
  public personita: any=[] ;

  //Lista roles
  public listaRoles!: any ;
  public rol: any=[] ;

  constructor(
    private toastr: Toastr,
    private fb: FormBuilder,
    private servicioUsuario: UsuarioService,
    private servicioPersona: PersonaService,
    private usuarioLogin: UsuarioLoginService,
    private servicioRol: RolService,
    public dialogRef: MatDialogRef<GuardarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarPersonas();
    if(this.data.id != 0){
      this.listarporid(this.data.id);
    }
  }

  public listarPersonas() {
    this.servicioPersona.listarTodos().subscribe(res => {
      this.persona.json = res;
      this.listaPersona = this.persona.json.data;
  });}


  public usuarioRol(data:any){
    this.usuarioLogin.retornarRoles(data).subscribe(res => {
      this.rol = res;
      console.log(this.rol);
    })
  }


  crearFormulario(){
    this.formusuario = this.fb.group({
      id: [''],
      persona: [null,Validators.required],
      password: [null,Validators.required],
      activo: [null,Validators.required]
    });
  }

  public guardar(id:any){
    let usuario : Usuario = new Usuario();
    usuario.idPersona = this.formusuario.controls['persona'].value;
    usuario.username = id;
    usuario.password = this.formusuario.controls['password'].value;
    usuario.activo = this.formusuario.controls['activo'].value;
    if(this.data.id == 0){
      this.registarUsuario(usuario)
    }
      else{
      usuario.id=this.data.id;
      this.actualizarUsuario(usuario)
    };
  }
  public obtenerId() {
    var id = this.formusuario.controls['persona'].value;
    this.listarPersonaId(id);
  }

  public listarPersonaId(id: any){
    this.servicioPersona.listarPorId(id).subscribe(res => {
      this.personita.json = res;
      this.idPersona =this.personita.json.data.Documento
      this.guardar(this.idPersona)
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
    });

  }

  public registarUsuario(usuario: Usuario) {
    this.servicioUsuario.registrar(usuario).subscribe(res => {
      this.dialogRef.close();
      this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
    });
  }

  public actualizarUsuario(usuario: Usuario) {
    this.servicioUsuario.actualizar(usuario).subscribe(res => {
      this.dialogRef.close(true);
      this.toastr.bien("Actulizacion Exitosa","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al actualizar","ERROR");
    });
  }

  public listarporid(id: number) {
    this.servicioUsuario.listarPorId(id).subscribe(res => {
      this.toastr.bien("Consulta Exitosa","¡¡EXITO!!");
      this.usuario.json = res;
      this.formusuario.controls['id'].setValue(this.data.Id);
      this.formusuario.controls['persona'].setValue(this.usuario.json.data.PersonaDTO.Id)
      this.formusuario.controls['password'].setValue(this.usuario.json.data.Password);
      this.formusuario.controls['activo'].setValue(this.usuario.json.data.Activo);
      console.log(this.usuario.json.data)
      this.usuarioRol(this.usuario.json.data)
    }, error => {
      this.toastr.mal("Ha ocurrido un error al listar","ERROR");
    });
  }

}
