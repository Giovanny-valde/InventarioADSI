import { Toastr } from 'src/app/material/toastr.service';
import { EmpresaService } from './../../../servicios/empresa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GuardarempresaComponent } from './guardar-empresa/guardar-empresa.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  public listaempresas: any = [];  // lista de empresas
  public retornoEmpresa: any = [];

  displayedColumns = ['Id','Nombre','Logo','Direccion','Telefono','Email','Opciones',];
    dataSource!:MatTableDataSource<any>;

    @ViewChild('paginator') paginator! : MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: Toastr,
    private servicioEmpresa: EmpresaService,
    public  dialog: MatDialog,
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
    this.servicioEmpresa.listarTodos().subscribe(res => {
      this.retornoEmpresa.json = res;
      this.listaempresas = this.retornoEmpresa.json.data;
      this.dataSource = new MatTableDataSource(this.listaempresas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  public modalGuardarEmpresa(id: number) {
    const dialogRef = this.dialog.open(GuardarempresaComponent, {
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
    this.listaempresas.forEach((empresa:any) => {
      if(empresa.id == id){
        empresa.activo = !empresa.activo;
        this.check.status=empresa.activo;
      }
      this.check.id=id;
    });
    alert("id: "+this.check.id+" status: "+this.check.status);
  }

  public eliminar(id:number){
    this.servicioEmpresa.eliminar(id).subscribe(res => {
      this.toastr.bien("Eliminado con exito","¡¡EXITO!!");
      this.listarTodos();
    }, error => {
      this.toastr.mal("Error al eliminar","ERROR");
    });
  }

}
