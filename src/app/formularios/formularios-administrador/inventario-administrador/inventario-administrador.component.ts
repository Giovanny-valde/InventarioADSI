import { Toastr } from 'src/app/material/toastr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventarioService } from 'src/app/servicios/inventario.service';
import { GuardarInventarioAdministradorComponent } from './guardar-inventario-administrador/guardar-inventario-administrador.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-inventario-administrador',
  templateUrl: './inventario-administrador.component.html',
  styleUrls: ['./inventario-administrador.component.css']
})
export class InventarioAdministradorComponent implements OnInit {


  public listaInventariosAdministrador: any = [];  // lista de Inventario Administrador
  public retornoInventarioAdministrador: any = [];

  displayedColumns = ['Id','Fecha','NombreAmbiente','Jornada','Opciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: Toastr,
    private servicioInventarioAdministrador: InventarioService,
    public  dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos() {
    this.servicioInventarioAdministrador.listarTodos().subscribe(res => {
      this.retornoInventarioAdministrador.json = res;
      this.listaInventariosAdministrador = this.retornoInventarioAdministrador.json.data;
      this.dataSource = new MatTableDataSource(this.listaInventariosAdministrador);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });}

    filterData($event : any){
      this.dataSource.filter = $event.target.value;
    }

  public modalGuardarInventarioAdministrador(id: number) {
    const dialogRef = this.dialog.open(GuardarInventarioAdministradorComponent, {
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
    this.listaInventariosAdministrador.forEach((inventarioAdministrador:any) => {
      if(inventarioAdministrador.id == id){
        inventarioAdministrador.activo = !inventarioAdministrador.activo;
        this.check.status=inventarioAdministrador.activo;
      }
      this.check.id=id;
    });
    alert("id: "+this.check.id+" status: "+this.check.status);
  }

  public eliminar(id:number){
    this.servicioInventarioAdministrador.eliminar(id).subscribe(res => {
      this.toastr.bien("Eliminado con exito","¡¡EXITO!!");
      this.listarTodos();
    }, error => {
      this.toastr.mal("Error al eliminar","ERROR");
    });
  }

}
