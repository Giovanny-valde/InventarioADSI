import { Toastr } from 'src/app/material/toastr.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Jornada } from 'src/app/modelos/jornada';
import { JornadaService } from 'src/app/servicios/jornada.service';

@Component({
  selector: 'app-guardar-jornada',
  templateUrl: './guardar-jornada.component.html',
  styleUrls: ['./guardar-jornada.component.css']
})
export class GuardarJornadaComponent implements OnInit {

  public formjornada!: FormGroup;
  public listaJornada!: any ;  // lista de jornada
  public jornada: any=[] ;
  public idjornada! : number;

  constructor(
    private toastr: Toastr,
    private fb: FormBuilder,
    private servicioJornada: JornadaService,
    public dialogRef: MatDialogRef<GuardarJornadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(){
    this.crearFormulario();
    if(this.data.id != 0){
    this.listarporid(this.data.id);
    }
  }

  private crearFormulario() {
    this.formjornada = this.fb.group({
      id: [''],
      codigo: [null,Validators.required],
      nombre: [null,Validators.required],
      activo: [null,Validators.required],
    });
  }

  public guardar() {
    let jornada : Jornada = new Jornada();
    jornada.codigo = this.formjornada.controls['codigo'].value;
    jornada.nombre = this.formjornada.controls['nombre'].value;
    jornada.activo = this.formjornada.controls['activo'].value;
    console.log(jornada);
    if(this.data.id == 0){
      this.registarJornada(jornada);
    }
    else{
      jornada.id=this.data.id;
      this.actualizarJornada(jornada)};
  }

  public registarJornada(jornada: Jornada) {
    this.servicioJornada.registrar(jornada).subscribe(res => {
      this.dialogRef.close();
      this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
    });
  }

  public actualizarJornada(jornada: Jornada) {
    this.servicioJornada.actualizar(jornada).subscribe(res => {
      this.dialogRef.close(true);
      this.toastr.bien("Actulizacion Exitosa","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al actualizar","ERROR");
    });
  }

  public listarporid(id: number) {
    this.servicioJornada.listarPorId(id).subscribe(res => {
      this.jornada.json = res;
      this.toastr.bien("Consulta Exitosa","¡¡EXITO!!");
      this.formjornada.controls['id'].setValue(this.data.Id);
      this.formjornada.controls['codigo'].setValue(this.jornada.json.data.Codigo);
      this.formjornada.controls['nombre'].setValue(this.jornada.json.data.Nombre);
      this.formjornada.controls['activo'].setValue(this.jornada.json.data.Activo)
    }, error => {
      this.toastr.mal("Ha ocurrido un error al listar","ERROR");
    });
  }

}
