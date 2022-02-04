import { Toastr } from 'src/app/material/toastr.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Inventario } from 'src/app/modelos/inventario';
import { AmbienteService } from 'src/app/servicios/ambiente.service';
import { InventarioService } from 'src/app/servicios/inventario.service';
import { JornadaService } from 'src/app/servicios/jornada.service';
import { DatePipe } from '@angular/common';
import { InventarioDetalleComponent } from './inventario-detalle/inventario-detalle.component';

@Component({
  selector: 'app-guardar-inventario-administrador',
  templateUrl: './guardar-inventario-administrador.component.html',
  styleUrls: ['./guardar-inventario-administrador.component.css']
})
export class GuardarInventarioAdministradorComponent implements OnInit {

  public forminventarioadministrador!: FormGroup;
  public listaInventarioAdministrador!: any;  // lista de Inventario Administrador
  public InventarioAdministrador: any=[] ;
  public idInventarioAdministrador! : number;


  pipe = new DatePipe('en-US');
  now = Date.now();

  mySimpleFormat!: any;
   myShortFormat!: any
  //Ambiente
  public listaAmbiente!: any ;  // lista de ambientes
  public ambiente: any=[] ;
  //Jornada
  public listaJornada!: any ;  // lista de jornadas
  public jornada: any=[] ;



  constructor(
    private toastr: Toastr,
    private fb: FormBuilder,
    private servicioInventarioAdministrador: InventarioService,
    private servicioAmbiente: AmbienteService,
    private servicioJornada: JornadaService,
    public  dialog: MatDialog,
    public dialogRef: MatDialogRef<GuardarInventarioAdministradorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.listarTodos();
    this.crearFormulario();
    this.listarAmbiente();
    this.listarJornada();
    if(this.data.id != 0){
      this.listarporid(this.data.id);
    }
  }

  public listarTodos() {
    this.servicioInventarioAdministrador.listarTodos().subscribe(res => {
      this.InventarioAdministrador.json = res;
      this.listaInventarioAdministrador = this.InventarioAdministrador.json.data;
      console.log(this.listaInventarioAdministrador);
    });}

  public modalInventarioDetalles() {
    const dialogRef = this.dialog.open(InventarioDetalleComponent, {
      height: '500px',
      width: '950px',
      data: {
        id: this.data.id
      }
    });
    dialogRef.afterClosed().subscribe(res=>{
      this.listarTodos();
    })
  }

  public listarAmbiente() {
    this.servicioAmbiente.listarTodos().subscribe(res => {
      this.ambiente.json = res;
      this.listaAmbiente = this.ambiente.json.data;
    });}

  public listarJornada() {
    this.servicioJornada.listarTodos().subscribe(res => {
      this.jornada.json = res;
      this.listaJornada = this.jornada.json.data;
  });}

  private crearFormulario() {
    this.forminventarioadministrador = this.fb.group({
      id: [''],
      fecha: [null,Validators.required],
      ambiente: [null,Validators.required],
      jornada: [null,Validators.required]
    });
  }

  public guardar() {
    let guardarInventarioA : Inventario = new Inventario();
    //'short'	'M/d/yy, h:mm a'	6/15/15, 9:03 AM
    //'medium'	'MMM d, y, h:mm:ss a'	Jun 15, 2015, 9:03:01 AM


     this.now = this.forminventarioadministrador.controls['fecha'].value;
     this.mySimpleFormat = this.pipe.transform(this.now, 'y-M-d h:mm:s');

    guardarInventarioA.fecha =  this.mySimpleFormat
    guardarInventarioA.idAmbiente = this.forminventarioadministrador.controls['ambiente'].value;
    guardarInventarioA.idJornada = this.forminventarioadministrador.controls['jornada'].value;
    console.log(this.mySimpleFormat)
    if(this.data.id == 0){
      this.registarInventarioAdministrador(guardarInventarioA);}
    else{
      guardarInventarioA.id=this.data.id;
      this.actualizarInventarioAdministrador(guardarInventarioA)};
  }


  public registarInventarioAdministrador(InventarioAdministrador: Inventario) {
    this.servicioInventarioAdministrador.registrar(InventarioAdministrador).subscribe(res => {
      this.dialogRef.close();
      this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
    });
  }

  public actualizarInventarioAdministrador(InventarioAdministrador: Inventario) {
    this.servicioInventarioAdministrador.actualizar(InventarioAdministrador).subscribe(res => {
      this.dialogRef.close(true);
      this.toastr.bien("Actulizacion Exitosa","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al actualizar","ERROR");
    });
  }

  public listarporid(id: number) {
    this.servicioInventarioAdministrador.listarPorId(id).subscribe(res => {
      this.toastr.bien("Consulta Exitosa","¡¡EXITO!!");
      this.InventarioAdministrador.json = res;
      this.forminventarioadministrador.controls['id'].setValue(this.data.Id);
      this.forminventarioadministrador.controls['fecha'].setValue(this.InventarioAdministrador.json.data.Fecha);
      this.forminventarioadministrador.controls['ambiente'].setValue(this.InventarioAdministrador.json.data.AmbienteDTO.Id);
      this.forminventarioadministrador.controls['jornada'].setValue(this.InventarioAdministrador.json.data.JornadaDTO.Id);
    }, error => {
      this.toastr.mal("Ha ocurrido un error al listar","ERROR");
    });
  }

}
