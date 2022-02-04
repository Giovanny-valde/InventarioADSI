import { UsuarioRolService } from 'src/app/servicios/usuario-rol.service';
import { UsuarioRol } from './../../modelos/usuario-rol';
import { Usuario } from 'src/app/modelos/usuario';
import { Toastr } from 'src/app/material/toastr.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Persona } from 'src/app/modelos/persona';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TipoDocumentoService } from 'src/app/servicios/tipo-documento.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
    public id: any;
    public formregistro!: FormGroup;
    public persona: any=[] ;
    public listaPersonas: any = [];  // lista de Persona
    public retornoPersona: any = [];

    public listaTipoDocumento!: any;
    public tipoDocumento:any=[];

    //Usuario
    public listaUsuarios: any = [];  // lista de Usuario
    public retornoUsuario: any = [];

    constructor(
      private toastr: Toastr,
      private fb: FormBuilder,
      private servicioPersona: PersonaService,
      private servicioUsuario: UsuarioService,
      private servicioUsuarioRol: UsuarioRolService,
      private servicioTipodocumento: TipoDocumentoService,
      ) {}

  ngOnInit(): void {
    this.listarDocumentos()
    this.crearFormulario()
  }

  public listarDocumentos() {
    this.servicioTipodocumento.listarTodos().subscribe(res => {
      this.tipoDocumento.json = res;
      this.listaTipoDocumento = this.tipoDocumento.json.data;
      console.log(this.listaTipoDocumento)
    });
  }

  private crearFormulario() {
    this.formregistro = this.fb.group({
      id: [''],
      nombre: [null,Validators.required],
      apellido: [null,Validators.required],
      documento: [null,Validators.required],
      tipodocumento: [null,Validators.required],
      telefono: [null,Validators.required],
      email: [null,Validators.required],
      direccion: [null,Validators.required],
      password: [null,Validators.required]
    });
  }


/**
 * Se listan todas las personas registradas en el servicio Persona
 * (Se actualizan)
 * Y se consigue el ultimo registro de ese retorno, el id sera el numero mayor
 * Se consigue la ultima persona y se envia al metodo guardarUsuario
 * @returns void
 */
  public idMayor() {
       this.servicioPersona.listarTodos().subscribe(res => {
        this.retornoPersona.json = res;
        this.listaPersonas = this.retornoPersona.json.data
        /////Hayar la ultima persona guardada
        for(let item of this.listaPersonas){
             var max = item.Id;
         }
         console.log("la perona mayor es "+max)
         this.guardarUsuario(max);
      });
  }
  /**
   * Metodo para guardar persona de los campos del formulario
   * Se crea un objeto de tipo Persona y cada campo es el equivalente de sus atributos
   * Se envia el objeto al metodo registrarPersona
   * @returns void
   */
  public guardarPersona() {
    let personaRegistro : Persona = new Persona();
    personaRegistro.nombres=this.formregistro.controls['nombre'].value;
    personaRegistro.apellidos=this.formregistro.controls['apellido'].value;
    personaRegistro.idTipoDocumento = this.formregistro.controls['tipodocumento'].value;
    personaRegistro.documento=this.formregistro.controls['documento'].value;
    personaRegistro.telefono=this.formregistro.controls['telefono'].value;
    personaRegistro.email=this.formregistro.controls['email'].value;
    personaRegistro.direccion=this.formregistro.controls['direccion'].value;

    this.registarPersona(personaRegistro);
  }
  /**
   * Metodo para registrar persona
   * Se envia el parametro persona, que es un objeto al metodo de servicio de persona
   * Despues se llama el metodo de idMayor
   * @param persona: es el objeto
   */

  public registarPersona(persona: any){
    this.servicioPersona.registrar(persona).subscribe(res => {
         this.idMayor();
      this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
    });


  }

  /**
   * Metodo para guardar el usuario de la ultima persona
   * Se consiguen los valores del formulario documento y password se envian al modelo de usuario
   * se envian al metodo registrarUsuario
   * @param data:la ultima persona
   */
  public guardarUsuario(data: any){


    let usuarioRegistro : Usuario = new Usuario();
    usuarioRegistro.password=this.formregistro.controls['password'].value;
    usuarioRegistro.username=this.formregistro.controls['documento'].value;
    usuarioRegistro.idPersona = data.toString();
    console.log(usuarioRegistro);
   this.registarUsuario(usuarioRegistro);
  }


  /**
   * Metodo para registrar usuario a la persona
   * @param usuario : es el usuario enviado
   */
  public registarUsuario(usuario: any){
    this.servicioUsuario.registrar(usuario).subscribe(res => {
      this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
      this.usuarioMayor();
    });

  }


  public usuarioMayor(){
      this.servicioUsuario.listarTodos().subscribe(res => {
      this.retornoUsuario.json = res;
      this.listaUsuarios = this.retornoUsuario.json.data
      /////Hayar la ultima persona guardada
      for(let item of this.listaUsuarios){
           var max = item.Id;
       }
       console.log("el usuario mayor es "+max)
       this.asignarUsuarioRol(max);
    });
  }

  public registarUsuarioRol(usuarioRol: any){
    this.servicioUsuarioRol.registrar(usuarioRol).subscribe(res => {
      this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
    });
  }


  public asignarUsuarioRol(data: any){
    let x:any=14;
    let usuarioRolRegistro : UsuarioRol = new UsuarioRol();
    usuarioRolRegistro.idRol= x.toString() ;
    usuarioRolRegistro.idUsuario= data.toString();
    this.registarUsuarioRol(usuarioRolRegistro);
  }

}
