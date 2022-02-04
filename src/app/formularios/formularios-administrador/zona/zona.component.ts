import { Toastr } from 'src/app/material/toastr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ZonaService } from 'src/app/servicios/zona.service';
import { GuardarZonaComponent } from './guardar-zona/guardar-zona.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.css']
})
export class ZonaComponent implements OnInit {

  public listaZonas: any = [];  // lista de zonas
  public retornoZona: any = [];

    displayedColumns = ['Id','Codigo','NombreAmbiente','Nombre','Opciones'];
    dataSource!:MatTableDataSource<any>;

    @ViewChild('paginator') paginator! : MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: Toastr,
    private servicioZona: ZonaService,
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
    this.servicioZona.listarTodos().subscribe(res => {
      this.retornoZona.json = res;
      this.listaZonas = this.retornoZona.json.data;
      this.dataSource = new MatTableDataSource(this.listaZonas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });}

    filterData($event : any){
      this.dataSource.filter = $event.target.value;
    }

    public modalGuardarZona(id: number) {
      const dialogRef = this.dialog.open(GuardarZonaComponent, {
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
      this.listaZonas.forEach((zona:any) => {
        if(zona.id == id){
          zona.activo = !zona.activo;
          this.check.status=zona.activo;
        }
        this.check.id=id;
      });
      alert("id: "+this.check.id+" status: "+this.check.status);
    }

    public eliminar(id:number){
      this.servicioZona.eliminar(id).subscribe(res => {
        this.toastr.bien("Eliminado con exito","¡¡EXITO!!");
        this.listarTodos();
      }, error => {
        this.toastr.mal("Error al eliminar","ERROR");
      });
    }

}
