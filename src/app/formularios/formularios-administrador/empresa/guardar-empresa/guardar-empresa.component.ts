import { Toastr } from './../../../../material/toastr.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { Empresa } from 'src/app/modelos/empresa';


@Component({
  selector: 'app-guardar-empresa',
  templateUrl: './guardar-empresa.component.html',
  styleUrls: ['./guardar-empresa.component.css']
})
export class GuardarempresaComponent implements OnInit {

  public formempresa!: FormGroup;
  public listaEmpresa!: any ;  // lista de empresas
  public empresa: any=[] ;
  public idempresa! : number;


  constructor(
    private fb: FormBuilder,
    private servicioEmpresa: EmpresaService,
     private toastr: Toastr,
    public dialogRef: MatDialogRef<GuardarempresaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.crearFormulario();
    if(this.data.id != 0){
      this.listarporid(this.data.id);
    }
  }

  private crearFormulario() {
    this.formempresa = this.fb.group({
      id: [''],
      nombre: [null,Validators.required],
      logo: [null,Validators.required],
      direccion: [null,Validators.required],
      telefono: [null,Validators.required],
      email: [null,Validators.required],
      activo: [null,Validators.required]
    });
  }

  public guardar() {

    let empresa : Empresa = new Empresa();
    empresa.nombre = this.formempresa.controls['nombre'].value;
    empresa.logo = this.formempresa.controls['logo'].value;
    empresa.direccion = this.formempresa.controls['direccion'].value;
    empresa.telefono = this.formempresa.controls['telefono'].value;
    empresa.email = this.formempresa.controls['email'].value;
    empresa.activo = this.formempresa.controls['activo'].value;
    console.log(empresa.nombre);
    if(this.data.id == 0){
      this.registarEmpresa(empresa);}
    else{
      empresa.id=this.data.id;
      this.actualizarEmpresa(empresa)};
    }

  public registarEmpresa(empresa: Empresa) {
    this.servicioEmpresa.registrar(empresa).subscribe(res => {
      this.dialogRef.close();
      this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
    });
  }

  public actualizarEmpresa(empresa: Empresa) {
    this.servicioEmpresa.actualizar(empresa).subscribe(res => {
      this.dialogRef.close(true);
      this.toastr.bien("Actulizacion Exitosa","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al actualizar","ERROR");
    });
  }

  public listarporid(id: number) {
    this.servicioEmpresa.listarPorId(id).subscribe(res => {
      this.toastr.bien("Consulta Exitosa","¡¡EXITO!!");
      this.empresa.json = res;
      this.formempresa.controls['id'].setValue(this.data.Id);
      this.formempresa.controls['nombre'].setValue(this.empresa.json.data.Nombre);
      this.formempresa.controls['logo'].setValue(this.empresa.json.data.Logo);
      this.formempresa.controls['direccion'].setValue(this.empresa.json.data.Direccion);
      this.formempresa.controls['telefono'].setValue(this.empresa.json.data.Telefono);
      this.formempresa.controls['email'].setValue(this.empresa.json.data.Email);
      this.formempresa.controls['activo'].setValue(this.empresa.json.data.Activo);
    }, error => {
      this.toastr.mal("Ha ocurrido un error al listar","ERROR");
    });
  }
}
