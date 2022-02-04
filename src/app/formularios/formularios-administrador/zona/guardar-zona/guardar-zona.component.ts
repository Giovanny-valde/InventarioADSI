import { Toastr } from 'src/app/material/toastr.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZonaService } from 'src/app/servicios/zona.service';
import { Zona } from 'src/app/modelos/zona';
import { AmbienteService } from 'src/app/servicios/ambiente.service';

@Component({
  selector: 'app-guardar-zona',
  templateUrl: './guardar-zona.component.html',
  styleUrls: ['./guardar-zona.component.css']
})
export class GuardarZonaComponent implements OnInit {

  public formZona!: FormGroup;
  public listaZona!: any ;  // lista de zonas
  public zona: any=[] ;
  public idZona! : number;
  public listaAmbiente!: any ;  // lista de sedes
  public ambiente: any=[] ;

  constructor(
    private toastr: Toastr,
    private fb: FormBuilder,
    private servicioZona: ZonaService,
    private servicioAmbiente: AmbienteService,
    public dialogRef: MatDialogRef<GuardarZonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarambientes();
    if(this.data.id != 0){
      this.listarporid(this.data.id);
    }
  }

  public listarambientes() {
    this.servicioAmbiente.listarTodos().subscribe(res => {
      this.ambiente.json = res;
      this.listaAmbiente = this.ambiente.json.data;
    });}

  private crearFormulario() {
    this.formZona = this.fb.group({
      id: [''],
      codigo: [null,Validators.required],
      ambiente: [null,Validators.required],
      nombre: [null,Validators.required],
      activo: [null,Validators.required]
    });
  }

  public guardar() {
    let zona : Zona = new Zona();
    zona.codigo = this.formZona.controls['codigo'].value;
    zona.nombre = this.formZona.controls['nombre'].value;
    zona.activo = this.formZona.controls['activo'].value;
    zona.idAmbiente = this.formZona.controls['ambiente'].value;
    console.log(zona);
    if(this.data.id == 0){
    this.registarZona(zona);}
    else{
      zona.id=this.data.id;
      this.actualizarZona(zona)};
  }
  public registarZona(zona: Zona) {
    this.servicioZona.registrar(zona).subscribe(res => {
      this.dialogRef.close();
      this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al actualizar","ERROR");
    });
  }
  public actualizarZona(zona: Zona) {
    this.servicioZona.actualizar(zona).subscribe(res => {
      this.dialogRef.close(true);
      this.toastr.bien("Actulizacion Exitosa","¡¡EXITO!!");
    }, error => {
      console.log("Ha ocurrido un error al actualizar");
    });
  }
  public listarporid(id: number) {
    this.servicioZona.listarPorId(id).subscribe(res => {
      this.toastr.bien("Consulta Exitosa","¡¡EXITO!!");
      this.zona.json = res;
      this.formZona.controls['id'].setValue(this.data.Id);
      this.formZona.controls['codigo'].setValue(this.zona.json.data.Codigo);
      this.formZona.controls['nombre'].setValue(this.zona.json.data.Nombre);
      this.formZona.controls['activo'].setValue(this.zona.json.data.Activo);
      this.formZona.controls['ambiente'].setValue(this.zona.json.data.Ambiente.Id);
    }, error => {
      this.toastr.mal("Ha ocurrido un error al listar","ERROR");
    });
  }

}
