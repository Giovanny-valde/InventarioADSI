import { Toastr } from 'src/app/material/toastr.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventarioDetalleService } from 'src/app/servicios/inventario-detalle.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-inventario-detalle',
  templateUrl: './inventario-detalle.component.html',
  styleUrls: ['./inventario-detalle.component.css']
})
export class InventarioDetalleComponent implements OnInit {

  public listaInventarioDetalle: any = []; //todos
  public retornoInventarioDetalle: any = [];
  public listaInventarioDetalleInventario: any = [];  //solo de este inventario

    displayedColumns = ['Id','Elemento', 'Cantidad', 'Observacion','Fecha', 'Usuario', 'Opciones'];
    dataSource!:MatTableDataSource<any>;

    @ViewChild('paginator') paginator! : MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: Toastr,
    private servicioInventarioDetalle: InventarioDetalleService,
    public  dialog: MatDialog,
    public dialogRef: MatDialogRef<InventarioDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
    this.servicioInventarioDetalle.listarTodos().subscribe(res => {
      this.retornoInventarioDetalle.json = res;
      this.listaInventarioDetalle = this.retornoInventarioDetalle.json.data;

      for(let i=0; i<this.listaInventarioDetalle.length; i++){
        if(this.listaInventarioDetalle[i].InventarioDTO.Id == this.data.id){
          this.listaInventarioDetalleInventario.push(this.listaInventarioDetalle[i]);
        }
      }
      console.log(this.listaInventarioDetalle)
      console.log(this.listaInventarioDetalleInventario)


      this.dataSource = new MatTableDataSource(this.listaInventarioDetalleInventario);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });}

    filterData($event : any){
      this.dataSource.filter = $event.target.value;
    }

  public eliminar(id:number){
    this.servicioInventarioDetalle.eliminar(id).subscribe(res => {
      this.toastr.bien("Consulta Exitosa","¡¡EXITO!!");
      this.listarTodos();
    }, error => {
      this.toastr.mal("Ha ocurrido un error al listar","ERROR");
    });
  }

}
