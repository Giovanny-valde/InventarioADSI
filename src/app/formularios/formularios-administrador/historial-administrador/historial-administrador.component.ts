import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GuardarHistorialAdministradorComponent } from './guardar-historial-administrador/guardar-historial-administrador.component';
import { Toastr } from 'src/app/material/toastr.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { InventarioService } from 'src/app/servicios/inventario.service';



@Component({
  selector: 'app-historial-administrador',
  templateUrl: './historial-administrador.component.html',
  styleUrls: ['./historial-administrador.component.css']
})
export class HistorialAdministradorComponent implements OnInit {

  public listaHistorialAdministrador: any = [];  // lista de Historiales
  public retornoHistorialAdministrador: any = [];

    displayedColumns = ['Id','Ambiente', 'SedeNombre', 'Bloque','Zona', 'Fecha', 'Opciones'];
    dataSource!:MatTableDataSource<any>;

    @ViewChild('paginator') paginator! : MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
      private toastr: Toastr,
      private servicioHistorialAdmi: InventarioService,
      public  dialog: MatDialog
    ) { }

    ngOnInit(): void {
      this.listarTodos();
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      console.log(this.dataSource.filter);
    }


  public listarTodos() {
    this.servicioHistorialAdmi.listarTodos().subscribe(res => {
      this.retornoHistorialAdministrador.json = res;
      this.listaHistorialAdministrador = this.retornoHistorialAdministrador.json.data;
      this.dataSource = new MatTableDataSource(this.listaHistorialAdministrador);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });}

    filterData($event : any){
      this.dataSource.filter = $event.target.value;
    }

  public modalGuardarHistorialAdministrador(id: number) {
    const dialogRef = this.dialog.open(GuardarHistorialAdministradorComponent, {
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
    this.listaHistorialAdministrador.forEach((historialAdmin:any) => {
      if(historialAdmin.id == id){
        historialAdmin.activo = !historialAdmin.activo;
        this.check.status=historialAdmin.activo;
      }
      this.check.id=id;
    });
    alert("id: "+this.check.id+" status: "+this.check.status);
  }


  public eliminar(id:number){
    this.servicioHistorialAdmi.eliminar(id).subscribe(res => {
      this.toastr.bien("Eliminado con exito","¡¡EXITO!!");
      this.listarTodos();
    }, error => {
      this.toastr.mal("Error al eliminar","ERROR");
    });
  }

}
