import { Toastr } from 'src/app/material/toastr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EstadoService } from 'src/app/servicios/estado.service';
import { GuardarEstadoComponent } from './guardar-estado/guardar-estado.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  public listaEstados: any = [];  // lista de estados
  public retornoEstado: any = [];

  displayedColumns = ['Id','Codigo','Nombre','actualizar',];
  dataSource!:MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: Toastr,
    private servicioEstado: EstadoService,
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
    this.servicioEstado.listarTodos().subscribe(res => {
      this.retornoEstado.json = res;
      this.listaEstados = this.retornoEstado.json.data;
      this.dataSource = new MatTableDataSource(this.listaEstados);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  public modalGuardarEstado(id: number) {
    const dialogRef = this.dialog.open(GuardarEstadoComponent, {
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
    this.listaEstados.forEach((estado:any) => {
      if(estado.id == id){
        estado.activo = !estado.activo;
        this.check.status=estado.activo;
      }
      this.check.id=id;
    });
    alert("id: "+this.check.id+" status: "+this.check.status);
  }
  public eliminar(id:number){
    this.servicioEstado.eliminar(id).subscribe(res => {
      this.toastr.bien("Eliminado con exito","¡¡EXITO!!");
      this.listarTodos();
    }, error => {
      this.toastr.mal("Error al eliminar","ERROR");
    });
  }
}
