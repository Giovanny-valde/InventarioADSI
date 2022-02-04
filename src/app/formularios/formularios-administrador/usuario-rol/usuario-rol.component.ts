import { Toastr } from 'src/app/material/toastr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioRolService } from 'src/app/servicios/usuario-rol.service';
import { GuardarUsuarioRolComponent } from './guardar-usuario-rol/guardar-usuario-rol.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';

@Component({
  selector: 'app-usuario-rol',
  templateUrl: './usuario-rol.component.html',
  styleUrls: ['./usuario-rol.component.css']
})
export class UsuarioRolComponent implements OnInit {

  public listaUsuariosRol: any = [];  // lista de roles
  public retornoUsuarioRol: any = [];

    displayedColumns = ['Id','Username', 'Rol', 'Opciones'];
    dataSource!:MatTableDataSource<any>;

    @ViewChild('paginator') paginator! : MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: Toastr,
    private serviciUsuarioRol: UsuarioRolService,
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
    this.serviciUsuarioRol.listarTodos().subscribe(res => {
      this.retornoUsuarioRol.json = res;
      this.listaUsuariosRol = this.retornoUsuarioRol.json.data;
      console.log(this.listaUsuariosRol)
      this.dataSource = new MatTableDataSource(this.listaUsuariosRol);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });}

    filterData($event : any){
      this.dataSource.filter = $event.target.value;
    }

  public modalGuardarUsuarioRol(id: number) {
    const dialogRef = this.dialog.open(GuardarUsuarioRolComponent, {
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


  public eliminar(id:number){
    this.serviciUsuarioRol.eliminar(id).subscribe(res => {
      this.toastr.bien("Consulta Exitosa","¡¡EXITO!!");
      this.listarTodos();
    }, error => {
      this.toastr.mal("Ha ocurrido un error al listar","ERROR");
    });
  }
}
