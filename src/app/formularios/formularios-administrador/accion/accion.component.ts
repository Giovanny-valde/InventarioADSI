import { Toastr } from 'src/app/material/toastr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccionService } from 'src/app/servicios/accion.service';
import { GuardarAccionComponent } from './guardar-accion/guardar-accion.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-accion',
  templateUrl: './accion.component.html',
  styleUrls: ['./accion.component.css']
})
export class AccionComponent implements OnInit {

  public listaAccion: any = [];  // lista de empresas
  public retornoAccion: any = [];

    displayedColumns = ['Id','Codigo','Nombre','Opciones'];
    dataSource!:MatTableDataSource<any>;

    @ViewChild('paginator') paginator! : MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: Toastr,
    private servicioAccion: AccionService,
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
    this.servicioAccion.listarTodos().subscribe(res => {
      this.retornoAccion.json = res;
      this.listaAccion = this.retornoAccion.json.data;
      this.dataSource = new MatTableDataSource(this.listaAccion);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });}

    filterData($event : any){
      this.dataSource.filter = $event.target.value;
    }


  public modalGuardarAccion(id: number) {
    const dialogRef = this.dialog.open(GuardarAccionComponent , {
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
    this.listaAccion.forEach((accion:any) => {
      if(accion.id == id){
        accion.activo = !accion.activo;
        this.check.status=accion.activo;
      }
      this.check.id=id;
    });
    alert("id: "+this.check.id+" status: "+this.check.status);
  }

  public eliminar(id:number){
    this.servicioAccion.eliminar(id).subscribe(res => {
      this.toastr.bien("Eliminado con exito","¡¡EXITO!!");
      this.listarTodos();
    }, error => {
      this.toastr.mal("Error al eliminar","ERROR");
    });
  }

}
