import { Toastr } from 'src/app/material/toastr.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sede } from 'src/app/modelos/sede';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { SedeService } from 'src/app/servicios/sede.service';

@Component({
  selector: 'app-guardar-sede',
  templateUrl: './guardar-sede.component.html',
  styleUrls: ['./guardar-sede.component.css']
})
export class GuardarSedeComponent implements OnInit {

  public formsede!: FormGroup;
  public listaSede!: any ;  // lista de sedes
  public sede: any=[] ;
  public idsede! : number;
  public listaEmpresa!: any ;  // lista de sedes
  public empresa: any=[] ;

  constructor(
    private toastr: Toastr,
    private fb: FormBuilder,
    private servicioSede: SedeService,
    private servicioEmpresa: EmpresaService,
    public dialogRef: MatDialogRef<GuardarSedeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarempresa();
    if(this.data.id != 0){
      this.listarporid(this.data.id);
    }
  }

  public listarempresa() {
    this.servicioEmpresa.listarTodos().subscribe(res => {
      this.empresa.json = res;
      this.listaEmpresa = this.empresa.json.data;
    });}

  private crearFormulario(){
    this.formsede = this.fb.group({
      id: [''],
      nombre: [null,Validators.required],
      direccion: [null,Validators.required],
      activo: [null,Validators.required],
      empresa: [null,Validators.required],
    });
  }

  public guardar() {
    let sede : Sede = new Sede();
    sede.nombre = this.formsede.controls['nombre'].value;
    sede.direccion = this.formsede.controls['direccion'].value;
    sede.activo = this.formsede.controls['activo'].value;
    sede.idEmpresa = this.formsede.controls['empresa'].value;
    console.log(sede);
    if(this.data.id == 0){
      this.registarSede(sede);}
    else{
      sede.id=this.data.id;
      this.actualizarSede(sede)};
    }

  public registarSede(sede: Sede) {
    this.servicioSede.registrar(sede).subscribe(res => {
      this.dialogRef.close();
      this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
    });
  }

  public actualizarSede(sede: Sede) {
    this.servicioSede.actualizar(sede).subscribe(res => {
      this.dialogRef.close(true);
      this.toastr.bien("Actulizacion Exitosa","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al actualizar","ERROR");
    });
  }

  public listarporid(id: number) {
    this.servicioSede.listarPorId(id).subscribe(res => {
      this.toastr.bien("Consulta Exitosa","¡¡EXITO!!");
      this.sede.json = res;
      this.formsede.controls['id'].setValue(this.data.Id);
      this.formsede.controls['nombre'].setValue(this.sede.json.data.Nombre);
      this.formsede.controls['direccion'].setValue(this.sede.json.data.Direccion);
      this.formsede.controls['activo'].setValue(this.sede.json.data.Activo);
      this.formsede.controls['empresa'].setValue(this.sede.json.data.Empresa.Id);
    }, error => {
      this.toastr.mal("Ha ocurrido un error al listar","ERROR");
    });
  }

}
