import { Toastr } from 'src/app/material/toastr.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Accion } from 'src/app/modelos/accion';
import { AccionService } from 'src/app/servicios/accion.service';

@Component({
  selector: 'app-guardar-accion',
  templateUrl: 'guardar-accion.component.html',
  styleUrls: ['./guardar-accion.component.css']
})
export class GuardarAccionComponent implements OnInit {

  public formaccion!: FormGroup;
  public listaAccion!: any ;  // lista de Acción
  public accion: any=[] ;
  public idaccion! : number;

  constructor(
    private toastr: Toastr,
    private fb: FormBuilder,
    private servicioAccion: AccionService,
    public dialogRef: MatDialogRef<GuardarAccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.crearFormulario();
    if(this.data.id != 0){
      this.listarporid(this.data.id);
    }
  }

  private crearFormulario() {
    this.formaccion = this.fb.group({
      id: [''],
      codigo: [null,Validators.required],
      nombre: [null,Validators.required],
      activo: [null,Validators.required]
    });
  }

  public guardar() {
    let accion : Accion = new Accion();
    accion.codigo = this.formaccion.controls['codigo'].value;
    accion.nombre = this.formaccion.controls['nombre'].value;
    accion.activo = this.formaccion.controls['activo'].value;
    console.log(accion);
    if(this.data.id == 0){
      this.registarAccion(accion);}
    else{
      accion.id=this.data.id;
      this.actualizarAccion(accion)
    };
  }

  public registarAccion(accion: Accion) {
    this.servicioAccion.registrar(accion).subscribe(res => {
      this.dialogRef.close();
      this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
    });
  }

  public actualizarAccion(accion: Accion) {
    this.servicioAccion.actualizar(accion).subscribe(res => {
      this.dialogRef.close(true);
      this.toastr.bien("Actulizacion Exitosa","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al actualizar","ERROR");
    });
  }

  public listarporid(id: number) {
    this.servicioAccion.listarPorId(id).subscribe(res => {
      this.accion.json = res;
      console.log(this.accion);
      this.formaccion.controls['id'].setValue(this.data.Id);
      this.formaccion.controls['codigo'].setValue(this.accion.json.data.Codigo);
      this.formaccion.controls['nombre'].setValue(this.accion.json.data.Nombre);
      this.formaccion.controls['activo'].setValue(this.accion.json.data.Activo);
    }, error => {
      console.log("Ha ocurrido un error al listar");
    });
  }


}
