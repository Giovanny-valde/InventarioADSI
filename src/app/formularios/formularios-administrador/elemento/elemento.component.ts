import { Toastr } from 'src/app/material/toastr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ElementoService } from 'src/app/servicios/elemento.service';
import { GuardarElementoComponent } from './guardar-elemento/guardar-elemento.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html',
  styleUrls: ['./elemento.component.css']
})
export class ElementoComponent implements OnInit {

  public listaElemento: any = [];  // lista de elemento
  public retornoElemento: any = [];

  displayedColumns = ['Id','Nombre','TipoElemento','Marca','Serial','Zona','Estado','Opciones'];
    dataSource!:MatTableDataSource<any>;

    @ViewChild('paginator') paginator! : MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: Toastr,
    private servicioElemento: ElementoService,
      public  dialog: MatDialog,
      private _liveAnnouncer: LiveAnnouncer
    )
  { }

  ngOnInit() {
    this.listarTodos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
  }

  public listarTodos() {
    this.servicioElemento.listarTodos().subscribe(res => {
      this.retornoElemento.json = res;
      this.listaElemento = this.retornoElemento.json.data;
      this.dataSource = new MatTableDataSource(this.listaElemento);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });}

    filterData($event : any){
      this.dataSource.filter = $event.target.value;
    }

  public modalGuardarElemento(id: number) {
    const dialogRef = this.dialog.open(GuardarElementoComponent, {
      height: '500px',
      width: '750px',
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(res=>{
      this.listarTodos();
    })
  }

  check:any={
    id:0,
    status:false
  }

  cambiarActivoInactivo(id:number){
    this.listaElemento.forEach((elemento:any) => {
      if(elemento.id == id){
        elemento.activo = !elemento.activo;
        this.check.status=elemento.activo;
      }
      this.check.id=id;
    });
    alert("id: "+this.check.id+" status: "+this.check.status);
  }
  public eliminar(id:number){
    this.servicioElemento.eliminar(id).subscribe(res => {
      this.toastr.bien("Eliminado con exito","¡¡EXITO!!");
      this.listarTodos();
    }, error => {
      this.toastr.mal("Error al eliminar","ERROR");
    });
  }

}
