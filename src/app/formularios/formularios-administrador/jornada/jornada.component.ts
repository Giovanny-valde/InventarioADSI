import { Toastr } from 'src/app/material/toastr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JornadaService } from 'src/app/servicios/jornada.service';
import { GuardarJornadaComponent } from './guardar-jornada/guardar-jornada.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css']
})
export class JornadaComponent implements OnInit {

  public listaJornada: any = [];  // lista de jornada
  public retornoJornada: any = [];

  displayedColumns = ['Id','Codigo','Nombre','Opciones',];
    dataSource!:MatTableDataSource<any>;

    @ViewChild('paginator') paginator! : MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: Toastr,
    private servicioJornada: JornadaService,
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
    this.servicioJornada.listarTodos().subscribe(res => {
      this.retornoJornada.json = res;
      this.listaJornada = this.retornoJornada.json.data;
      this.dataSource = new MatTableDataSource(this.listaJornada);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  public modalGuardarJornada(id: number) {
    const dialogRef = this.dialog.open(GuardarJornadaComponent, {
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
    this.listaJornada.forEach((jornada:any) => {
      if(jornada.id == id){
        jornada.activo = !jornada.activo;
        this.check.status=jornada.activo;
      }
      this.check.id=id;
    });
    alert("id: "+this.check.id+" status: "+this.check.status);
  }

  public eliminar(id:number){
    this.servicioJornada.eliminar(id).subscribe(res => {
      this.toastr.bien("Eliminado con exito","¡¡EXITO!!");
      this.listarTodos();
    }, error => {
      this.toastr.mal("Error al eliminar","ERROR");
    });
  }

}
