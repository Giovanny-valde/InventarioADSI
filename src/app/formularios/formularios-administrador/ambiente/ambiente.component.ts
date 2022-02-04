import { Toastr } from 'src/app/material/toastr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AmbienteService } from 'src/app/servicios/ambiente.service';
import { GuardarAmbienteComponent } from './guardar-ambiente/guardar-ambiente.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html',
  styleUrls: ['./ambiente.component.css']
})
export class AmbienteComponent implements OnInit {
  public listaAmbiente: any = [];  // lista de ambiente
  public retornoAmbiente: any = [];

  displayedColumns = ['Id','NombreSede','Nombre','Capacidad','Descripcion','Opciones',];
    dataSource!:MatTableDataSource<any>;

    @ViewChild('paginator') paginator! : MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private toastr: Toastr,
    private servicioAmbiente: AmbienteService,
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
    this.servicioAmbiente.listarTodos().subscribe(res => {
      this.retornoAmbiente.json = res;
      this.listaAmbiente = this.retornoAmbiente.json.data;
      this.dataSource = new MatTableDataSource(this.listaAmbiente);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });}

    filterData($event : any){
      this.dataSource.filter = $event.target.value;
    }

  public modalGuardarAmbiente(id: number) {
    const dialogRef = this.dialog.open(GuardarAmbienteComponent, {
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
    this.listaAmbiente.forEach((ambiente:any) => {
      if(ambiente.id == id){
        ambiente.activo = !ambiente.activo;
        this.check.status=ambiente.activo;
      }
      this.check.id=id;
    });
    alert("id: "+this.check.id+" status: "+this.check.status);
  }

  public eliminar(id:number){
    this.servicioAmbiente.eliminar(id).subscribe(res => {
      this.toastr.bien("Eliminado con exito","¡¡EXITO!!");
      this.listarTodos();
    }, error => {
      this.toastr.mal("Error al eliminar","ERROR");
    });
  }
}
