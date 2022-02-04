import { Toastr } from 'src/app/material/toastr.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadoService } from 'src/app/servicios/estado.service';
import { Estado } from 'src/app/modelos/estado';

@Component({
  selector: 'app-guardar-estado',
  templateUrl: './guardar-estado.component.html',
  styleUrls: ['./guardar-estado.component.css']
})
export class GuardarEstadoComponent implements OnInit {

  public formEstado!: FormGroup;
  public listaEstado!: any ;  // lista de estados
  public estado: any=[] ;
  public idEstado! : number;

  constructor(
    private toastr: Toastr,
    private fb: FormBuilder,
    private servicioEstado: EstadoService,
    public dialogRef: MatDialogRef<GuardarEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    if(this.data.id != 0){
    this.listarporid(this.data.id);
  }
  }

  private crearFormulario() {
    this.formEstado = this.fb.group({
      id: [''],
      codigo: [null,Validators.required],
      nombre: [null,Validators.required],
      activo: [null,Validators.required]
    });
  }

  public guardar() {
    let estado : Estado = new Estado();
    estado.codigo = this.formEstado.controls['codigo'].value;
    estado.nombre = this.formEstado.controls['nombre'].value;
    estado.activo = this.formEstado.controls['activo'].value;
    console.log(estado);
    if(this.data.id == 0){
    this.registarEstado(estado);
  }
    else{
    estado.id=this.data.id;
    this.actualizarEstado(estado)};
  }

  public registarEstado(estado: Estado) {
    this.servicioEstado.registrar(estado).subscribe(res => {
      this.dialogRef.close();
      this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
    });
  }
  public actualizarEstado(estado: Estado) {
    this.servicioEstado.actualizar(estado).subscribe(res => {
      this.dialogRef.close(true);
      this.toastr.bien("Actulizacion Exitosa","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al actualizar","ERROR");
    });
  }
  public listarporid(id: number) {
    this.servicioEstado.listarPorId(id).subscribe(res => {
      this.toastr.bien("Consulta Exitosa","¡¡EXITO!!");
      this.estado.json = res;
      this.formEstado.controls['id'].setValue(this.data.Id);
      this.formEstado.controls['codigo'].setValue(this.estado.json.data.Codigo);
      this.formEstado.controls['nombre'].setValue(this.estado.json.data.Nombre);
      this.formEstado.controls['activo'].setValue(this.estado.json.data.Activo);
    }, error => {
      this.toastr.mal("Ha ocurrido un error al listar","ERROR");
    });
  }

}
