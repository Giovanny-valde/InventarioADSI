import { Toastr } from 'src/app/material/toastr.service';
import { TipoElemento } from './../../../../modelos/tipo-elemento';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Elemento } from 'src/app/modelos/elemento';
import { AmbienteService } from 'src/app/servicios/ambiente.service';
import { TipoElementoService } from 'src/app/servicios/tipo-elemento.service';
import { ElementoService } from 'src/app/servicios/elemento.service';
import { ZonaService } from 'src/app/servicios/zona.service';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-guardar-elemento',
  templateUrl: './guardar-elemento.component.html',
  styleUrls: ['./guardar-elemento.component.css']
})
export class GuardarElementoComponent implements OnInit {
  public formelemento!: FormGroup;
  public listaElemento!: any ;  // lista de elemento
  public elemento: any=[] ;
  public idelemento! : number;

  //Ambiente
  public listaAmbiente!: any ;  // lista de sedes
  public ambiente: any=[] ;
  //Tipo elemento
  public listaTipo: any = [];
  public tipo: any=[];
  //Zona
  public listaZona!: any ;
  public zona: any=[] ;
  //Estado
  public listaEstado!: any ;
  public estado: any=[] ;


  constructor(
    private toastr: Toastr,
    private fb: FormBuilder,
    private servicioElemento: ElementoService,
    private servicioAmbiente: AmbienteService,
    private servicioTipo: TipoElementoService,
    private servicioZona: ZonaService,
    private servicioEstado: EstadoService,
    public dialogRef: MatDialogRef<GuardarElementoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarambiente();
    this.listartipo();
    this.listarzona();
    this.listarestado();
    if(this.data.id != 0){
      this.listarporid(this.data.id);
    }
  }
  public listarambiente() {
    this.servicioAmbiente.listarTodos().subscribe(res => {
      this.ambiente.json = res;
      this.listaAmbiente = this.ambiente.json.data;
  });}

  public listartipo() {
    this.servicioTipo.listarTodos().subscribe(res => {
      this.tipo.json = res;
      this.listaTipo = this.tipo.json.data;
  });}

  public listarzona() {
    this.servicioZona.listarTodos().subscribe(res => {
      this.zona.json = res;
      this.listaZona = this.zona.json.data;
  });}

  public listarestado(){
    this.servicioEstado.listarTodos().subscribe(res => {
      this.estado.json = res;
      this.listaEstado = this.estado.json.data;
  });
  }

  private crearFormulario() {
    this.formelemento = this.fb.group({
      id: [''],
      nombre: [null,Validators.required],
      tipoelemento: [null,Validators.required],
     // imagen: [null,Validators.required],
      marca: [null,Validators.required],
      serial: [null,Validators.required],
      zona: [null,Validators.required],
      estado: [null,Validators.required],
      activo: [null,Validators.required],
    });
  }

  public guardar() {
    let elemento : Elemento = new Elemento();
    elemento.nombre = this.formelemento.controls['nombre'].value;
    elemento.idTipoElemento = this.formelemento.controls['tipoelemento'].value;
    elemento.marca = this.formelemento.controls['marca'].value;
    elemento.serial = this.formelemento.controls['serial'].value;
    elemento.idZona = this.formelemento.controls['zona'].value;
    elemento.idEstado = this.formelemento.controls['estado'].value;
    elemento.activo = this.formelemento.controls['activo'].value;
    console.log(elemento);
    if(this.data.id == 0){
      this.registarElemento(elemento);}
    else{
      elemento.id=this.data.id;
      this.actualizarElemento(elemento)};
    }

  public registarElemento(elemento: Elemento) {
    this.servicioElemento.registrar(elemento).subscribe(res => {
      this.dialogRef.close();
      this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
    });
  }

  public actualizarElemento(elemento: Elemento) {
    this.servicioElemento.actualizar(elemento).subscribe(res => {
      this.dialogRef.close(true);
      this.toastr.bien("Actulizacion Exitosa","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al actualizar","ERROR");
    });
  }

  public listarporid(id: number) {
    this.servicioElemento.listarPorId(id).subscribe(res => {
      this.toastr.bien("Consulta Exitosa","¡¡EXITO!!");
      this.elemento.json = res;
      this.formelemento.controls['id'].setValue(this.data.Id);
      this.formelemento.controls['nombre'].setValue(this.elemento.json.data.Nombre);
      this.formelemento.controls['tipoelemento'].setValue(this.elemento.json.data.TipoElementoDTO.Id);
      //this.formelemento.controls['imagen'].setValue(this.elemento.json.data.imagen);
      this.formelemento.controls['marca'].setValue(this.elemento.json.data.Marca)
      this.formelemento.controls['serial'].setValue(this.elemento.json.data.Serial);
      this.formelemento.controls['zona'].setValue(this.elemento.json.data.ZonaDTO.Id);
      this.formelemento.controls['estado'].setValue(this.elemento.json.data.EstadoDTO.Id);
      this.formelemento.controls['activo'].setValue(this.elemento.json.data.Activo);
    }, error => {
      this.toastr.mal("Ha ocurrido un error al listar","ERROR");
    });
  }

}
