import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Toastr } from 'src/app/material/toastr.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InventarioService } from 'src/app/servicios/inventario.service';

@Component({
  selector: 'app-historial-aprendiz',
  templateUrl: './historial-aprendiz.component.html',
  styleUrls: ['./historial-aprendiz.component.css']
})
export class HistorialAprendizComponent implements OnInit {

  public listaHistorialAdministrador: any = [];  // lista de Historiales
  public retornoHistorialAdministrador: any = [];

    displayedColumns = ['Id','AmbienteNombre','Sede', 'Jornada','Fecha', 'Opciones'];
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

  check:any={
    id:0,
    status:false
  }

}
