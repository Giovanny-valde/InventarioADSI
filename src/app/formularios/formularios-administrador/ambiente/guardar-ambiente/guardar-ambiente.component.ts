import { Toastr } from 'src/app/material/toastr.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ambiente } from 'src/app/modelos/ambiente';
import { AmbienteService } from 'src/app/servicios/ambiente.service';
import { SedeService } from 'src/app/servicios/sede.service';
@Component({
  selector: 'app-guardar-ambiente',
  templateUrl: './guardar-ambiente.component.html',
  styleUrls: ['./guardar-ambiente.component.css']
})
export class GuardarAmbienteComponent implements OnInit {

  public formambiente!: FormGroup;
  public listaAmbiente!: any ;  // lista de ambiente
  public ambiente: any=[] ;
  public idambiente! : number;
  public listaSede!: any ;  // lista de sedes
  public sede: any=[] ;

  constructor(
    private toastr: Toastr,
    private fb: FormBuilder,
    private servicioSede: SedeService,
    private servicioAmbiente: AmbienteService,
    public dialogRef: MatDialogRef<GuardarAmbienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarSede();
    if(this.data.id != 0){
      this.listarporid(this.data.id);
    }
  }

  public listarSede() {
    this.servicioSede.listarTodos().subscribe(res => {
      this.sede.json = res;
      this.listaSede = this.sede.json.data;
      console.log(this.listaSede);
  });}

  private crearFormulario() {
    this.formambiente = this.fb.group({
      id: [''],
      sede: [null,Validators.required],
      nombre: [null,Validators.required],
      descripcion: [null,Validators.required],
      capacidad: [null,Validators.required],
      bloque: [null,Validators.required],
      activo: [null,Validators.required]
    });
  }

  public guardar() {
    let ambiente : Ambiente = new Ambiente();
    ambiente.nombre = this.formambiente.controls['nombre'].value;
    ambiente.descripcion = this.formambiente.controls['descripcion'].value;
    ambiente.capacidad = this.formambiente.controls['capacidad'].value;
    ambiente.bloque = this.formambiente.controls['bloque'].value;
    ambiente.activo = this.formambiente.controls['activo'].value;
    ambiente.idSede = this.formambiente.controls['sede'].value;
    console.log(ambiente);
    if(this.data.id == 0){
    this.registarAmbiente(ambiente);}
    else{
      ambiente.id=this.data.id;
      this.actualizarAmbiente(ambiente)};
  }

  public registarAmbiente(ambiente: Ambiente) {
    this.servicioAmbiente.registrar(ambiente).subscribe(res => {
      this.dialogRef.close();
      this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
    });
  }

  public actualizarAmbiente(ambiente: Ambiente) {
    this.servicioAmbiente.actualizar(ambiente).subscribe(res => {
      this.dialogRef.close(true);
      this.toastr.bien("Actulizacion Exitosa","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al actualizar","ERROR");
    });
  }

  public listarporid(id: number) {
    this.servicioAmbiente.listarPorId(id).subscribe(res => {
      this.toastr.bien("Consulta Exitosa","¡¡EXITO!!");
      this.ambiente.json = res;
      this.formambiente.controls['id'].setValue(this.data.Id);
      this.formambiente.controls['sede'].setValue(this.ambiente.json.data.Sede.Id);
      this.formambiente.controls['nombre'].setValue(this.ambiente.json.data.Nombre);
      this.formambiente.controls['descripcion'].setValue(this.ambiente.json.data.Descripcion);
      this.formambiente.controls['capacidad'].setValue(this.ambiente.json.data.Capacidad);
      this.formambiente.controls['bloque'].setValue(this.ambiente.json.data.Bloque);
      this.formambiente.controls['activo'].setValue(this.ambiente.json.data.Activo);
    }, error => {
      this.toastr.mal("Ha ocurrido un error al listar","ERROR");
    });
  }

}
