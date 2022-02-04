import { Toastr } from 'src/app/material/toastr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RolService } from 'src/app/servicios/rol.service';
import { GuardarRolComponent } from './guardar-rol/guardar-rol.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  public listaRoles: any = [];  // lista de roles
  public retornoRol: any = [];

   displayedColumns = ['Id','Nombre','actualizar',];
   dataSource!:MatTableDataSource<any>;

    @ViewChild('paginator') paginator! : MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: Toastr,
    private servicioRol: RolService,
    public  dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
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
    this.servicioRol.listarTodos().subscribe(res => {
      this.retornoRol.json = res;
      this.listaRoles = this.retornoRol.json.data;
      this.dataSource = new MatTableDataSource(this.listaRoles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  public modalGuardarRol(id: number) {
    const dialogRef = this.dialog.open(GuardarRolComponent, {
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
    this.listaRoles.forEach((rol:any) => {
      if(rol.id == id){
        rol.activo = !rol.activo;
        this.check.status=rol.activo;
      }
      this.check.id=id;
    });
    alert("id: "+this.check.id+" status: "+this.check.status);
  }

  public eliminar(id:number){
    this.servicioRol.eliminar(id).subscribe(res => {
      this.toastr.bien("Eliminado con exito","¡¡EXITO!!");
      this.listarTodos();
    }, error => {
      this.toastr.mal("Error al eliminar","ERROR");
    });
  }

}
