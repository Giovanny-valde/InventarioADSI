import { Toastr } from 'src/app/material/toastr.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventarioDetalleService } from 'src/app/servicios/inventario-detalle.service';
import { AmbienteService } from 'src/app/servicios/ambiente.service';
import { ZonaService } from 'src/app/servicios/zona.service';
import { UsuarioLoginService } from 'src/app/servicios/usuario-login.service';
import { InventarioDetalle } from 'src/app/modelos/inventario-detalle';
import { InventarioService } from 'src/app/servicios/inventario.service';
import { filter, last } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-inventario-aprendiz',
  templateUrl: './inventario-aprendiz.component.html',
  styleUrls: ['./inventario-aprendiz.component.css'],
})
export class InventarioAprendizComponent implements OnInit {

  // lista de Inventario 
  public listaInventarios: any = [];
  public retornoInventario: any = [];

  // lista de Inventario  detalle
  public listaInventarioDetalle: any = [];
  public retornoInventarioDetalle: any = [];

  // lista de Ambiente
  public listaAmbiente: any = [];
  public retornoAmbiente: any = [];

  // lista de Zona
  public listaZona: any = [];
  public retornoZona: any = [];

  // lista de Zona
  public listaElemento: any = [];
  public retornoElemento: any = [];

  //array de inventarios detalles
  public idElementos: any = [];
  public Observaciones: any = [];
  public Cantis: any = [];

  public aparecer: number = 0;
  public idAmbiente: number = 0;
  public idInventario: number = 0;
  public forminventarioaprendiz!: FormGroup;
  public idusuario: any;

  public inicio: number = 0;
  public fin: number = 1;
  public total: number = 0;

  constructor(
    private toastr: Toastr,
    private fb: FormBuilder,
    private servicioInventarioAprendiz: InventarioDetalleService,
    private servicioAmbiente: AmbienteService,
    private servicioZona: ZonaService,
    private usuarios: UsuarioLoginService,
    private servicioInventario: InventarioService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.listarAmbiente();
    this.aparecer = 0;
  }

  private crearFormulario() {
    this.forminventarioaprendiz = this.fb.group({
      elemento: [''],
      marca: [''],
      cantidad: ['', Validators.required],
      observacion: [null, Validators.required],
      fecha: [null],
      ambiente: [''],
      zona: [''],
    });
  }

  public guardar(data: any) {
    
    if (this.inicio != this.total) {
      let inventarioAprendiz: InventarioDetalle = new InventarioDetalle();
      inventarioAprendiz.cantidad = this.forminventarioaprendiz.controls['cantidad'].value;
      inventarioAprendiz.observacion = this.forminventarioaprendiz.controls['observacion'].value;
      inventarioAprendiz.idElemento = data.toString();
      inventarioAprendiz.idInventario = data.toString();
      this.idusuario = this.usuarios.getUsuario();
      inventarioAprendiz.idUsuario = this.idusuario;
      //let  observacion = this.forminventarioaprendiz.controls['observacion'].value;
      console.log(inventarioAprendiz);

      //devolver campos a vacio
      this.forminventarioaprendiz.controls['cantidad'].setValue('');
      this.forminventarioaprendiz.controls['observacion'].setValue('');

      //recorrida de la lista de elementos 1 x 1
      this.inicio += 1;
        this.fin += 1;
       if (this.inicio != this.total) {
        this.rellenarCampos();
       }
    }
    if (this.inicio == this.total) {
      alert('Zona completada');
      this.aparecer = 0;
    }
  }

  public inventarioAmbiente() {
    this.servicioInventario.listarTodos().subscribe((res) => {
      this.retornoInventario.json = res;
      this.listaInventarios = this.retornoInventario.json.data;
      var cont: number = 0;
      
      var retorinve = from(this.listaInventarios);
      retorinve.pipe(
        filter((ev:any) => ev.AmbienteDTO.Id == this.idAmbiente)
        ,last()
        ).subscribe((val:any) => { 
        if(val.AmbienteDTO.Id == this.idAmbiente){
               this.idInventario = val.Id;
             cont += 1;
           }
       });

      // for(let item of this.listaInventarios){
      //   if(item.AmbienteDTO.Id == this.idAmbiente){
      //     var inventa = item.Id;
      //      cont += 1;
      //   }
      //  }
     // inventa.subscribe((val:any) => console.log(`'a' is ${val}.`));
      if(cont == 0){  let b
        this.toastr.mal(this.retornoInventario.json.message, 'NO EXISTE INVENTARIO PARA ESTE AMBIENTE');
      }else{
        console.log("el mayor inventario de este ambiente es: "+this.idInventario);
        this.miInventario();
      }
    })
  }

  //PETICIONES HTTP
  public listarAmbiente() {
    this.servicioAmbiente.listarTodos().subscribe((res) => {
      this.retornoAmbiente.json = res;
      this.listaAmbiente = this.retornoAmbiente.json.data;
      // console.log(this.listaAmbiente);
    });
  }

  public miInventario() {
      this.servicioInventarioAprendiz.listarTodos().subscribe((res) => {
      this.retornoInventarioDetalle.json = res;
      this.listaInventarioDetalle = this.retornoInventarioDetalle.json.data;
        this.recargarElementos();
      })
  }
  public recargarElementos(){
    // console.log("entro a recargar"+this.idInventario);
    for(let item of this.listaInventarioDetalle){
       if(item.InventarioDTO.Id == this.idInventario){
           var id = item.ElementoDTO.Id;
           var canti = item.cantidad;
            var obser = item.Observaciones;
           this.idElementos.push({id}).json;
           this.Observaciones.push({obser}).json;
           this.Cantis.push({canti}).json;
           // console.log("el nombre del elemento es: "+nombre);
           // console.log("el id del elemento es: "+canti);
           // console.log("la observacion del elemento es: "+obser);
       }
   }
//  //inventario detalle
//   console.log(this.idElementos.length)
//  console.log(this.idElementos);
//  console.log(this.Observaciones);
//   console.log(this.Cantis);
  }

  public listarZoans() {
    this.aparecer = 0;
    this.idAmbiente = this.forminventarioaprendiz.controls['ambiente'].value;
    // console.log(this.idAmbiente);
    this.servicioAmbiente.listarPorId(this.idAmbiente).subscribe((res) => {
      this.retornoZona.json = res;
      this.listaZona = this.retornoZona.json.data.lstZonaDTO;
      //  console.log(this.listaZona)
      this.toastr.bien('ECHO', 'ZONAS OBTENIDAS CON EXITO');
    });
    this.inventarioAmbiente();
  }

  public listarElementos() {
    this.forminventarioaprendiz.controls['cantidad'].setValue('');
    this.forminventarioaprendiz.controls['observacion'].setValue('');
    this.inicio = 0;
    this.fin = 1;
    let idZona = this.forminventarioaprendiz.controls['zona'].value;
    this.servicioZona.listarPorId(idZona).subscribe((res) => {
      this.retornoElemento.json = res;
      this.listaElemento = this.retornoElemento.json.data.listElementoDTO;
      this.total = this.listaElemento.length   ;
      this.rellenarCampos();  //llenar campos
    });
  }

  public rellenarCampos(){
    var idelemento = this.listaElemento[this.inicio].Id;
    for (let i = 0; i < this.idElementos.length; i++) { 
      // console.log(this.idElementos[i].id);
      var ideleme = this.idElementos[i].id;
      if(idelemento == ideleme){
        // console.log("entro");
        this.forminventarioaprendiz.controls['cantidad'].setValue(this.Cantis[i].canti);
        this.forminventarioaprendiz.controls['observacion'].setValue(this.Observaciones[i].obser);
        this.toastr.bien('ECHO', 'ELEMENTOS OBTENIDOS CON EXITO');        }
      }
    this.aparecer = 1;
  }

}
