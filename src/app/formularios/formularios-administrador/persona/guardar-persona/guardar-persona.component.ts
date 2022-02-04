import { Toastr } from 'src/app/material/toastr.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from 'src/app/modelos/persona';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TipoDocumentoService } from 'src/app/servicios/tipo-documento.service';
//import { parse } from 'querystring';
@Component({
  selector: 'app-guardar-persona',
  templateUrl: './guardar-persona.component.html',
  styleUrls: ['./guardar-persona.component.css']
})
export class GuardarPersonaComponent implements OnInit {

    public formpersona!: FormGroup;
    public listaPersona!: any ;  // lista de Personas
    public persona: any=[] ;
    public idpersona! : number;

    public listaTipoDocumento!: any;
    public tipoDocumento:any=[];

    constructor(
      private toastr: Toastr,
      private fb: FormBuilder,
      private servicioPersona: PersonaService,
      private servicioTipoDocumento: TipoDocumentoService,
      public dialogRef: MatDialogRef<GuardarPersonaComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

     ngOnInit(){
       this.crearFormulario();
       this.listarTipoDocumento();
      if(this.data.id != 0){
        this.listarporid(this.data.id);
      }
     }
     public listarTipoDocumento() {
      this.servicioTipoDocumento.listarTodos().subscribe(res => {
        this.tipoDocumento.json = res;
        this.listaTipoDocumento = this.tipoDocumento.json.data;
      });
    }
    private crearFormulario() {
      this.formpersona = this.fb.group({
        id: [''],
        nombre: [null,Validators.required],
        apellido: [null,Validators.required],
        documento: [null,Validators.required],
        tipodocumento: [null,Validators.required],
        telefono: [null,Validators.required],
        email: [null,Validators.required],
        direccion: [null,Validators.required],
        activo: [null,Validators.required]
      });
    }

    public guardar() {
      let persona : Persona = new Persona();
      persona.nombres=this.formpersona.controls['nombre'].value;
      persona.apellidos=this.formpersona.controls['apellido'].value;
      persona.documento=this.formpersona.controls['documento'].value;
      persona.idTipoDocumento = this.formpersona.controls['tipodocumento'].value.toString();
      persona.telefono=this.formpersona.controls['telefono'].value;
      persona.email=this.formpersona.controls['email'].value;
      persona.direccion=this.formpersona.controls['direccion'].value;
      persona.activo = this.formpersona.controls['activo'].value;
      if(this.data.id == 0){
        this.registarPersona(persona);
      }
      else{
        persona.id=this.data.id;
        this.actualizarPersona(persona)
      };
    }

    public registarPersona(persona: Persona) {
      console.log(persona)
      this.servicioPersona.registrar(persona).subscribe(res => {
        this.dialogRef.close();
        this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
      }, error => {
        this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
      });
    }

     public actualizarPersona(persona: Persona) {
       console.log(persona)
      this.servicioPersona.actualizar(persona).subscribe(res => {

        this.dialogRef.close(true);
        this.toastr.bien("Actulizacion Exitosa","¡¡EXITO!!");
      }, error => {
        this.toastr.mal("Ha ocurrido un error al actualizar","ERROR");
      });
    }

    public listarporid(id: number) {
      this.servicioPersona.listarPorId(id).subscribe(res => {
        this.toastr.bien("Consulta Exitosa","¡¡EXITO!!");
        this.persona.json = res;
        this.formpersona.controls['id'].setValue(this.data.Id);
        this.formpersona.controls['nombre'].setValue(this.persona.json.data.Nombres);
        this.formpersona.controls['apellido'].setValue(this.persona.json.data.Apellidos);
        this.formpersona.controls['documento'].setValue(this.persona.json.data.Documento);
        this.formpersona.controls['tipodocumento'].setValue(this.persona.json.data.TipoDocumentoDTO.Id);
        this.formpersona.controls['telefono'].setValue(this.persona.json.data.Telefono);
        this.formpersona.controls['email'].setValue(this.persona.json.data.Email);
        this.formpersona.controls['direccion'].setValue(this.persona.json.data.Direccion);
        this.formpersona.controls['activo'].setValue(this.persona.json.data.Activo);
      }, error => {
        this.toastr.mal("Ha ocurrido un error al listar","ERROR");
      });
    }
}
