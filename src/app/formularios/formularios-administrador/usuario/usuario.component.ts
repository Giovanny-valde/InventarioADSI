import { Toastr } from 'src/app/material/toastr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { GuardarUsuarioComponent } from './guardar-usuario/guardar-usuario.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public listaUsuarios: any = [];  // lista de roles
  public retornoUsuario: any = [];

  displayedColumns = ['Id','NombrePersona', 'Username', 'Opciones'];
    dataSource!:MatTableDataSource<any>;

    @ViewChild('paginator') paginator! : MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: Toastr,
    private servicioUsuario: UsuarioService,
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
    this.servicioUsuario.listarTodos().subscribe(res => {
      this.retornoUsuario.json = res;
      this.listaUsuarios = this.retornoUsuario.json.data;
      this.dataSource = new MatTableDataSource(this.listaUsuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });}

    filterData($event : any){
      this.dataSource.filter = $event.target.value;
    }

  public modalGuardarUsuario(id: number) {
    const dialogRef = this.dialog.open(GuardarUsuarioComponent, {
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
    this.listaUsuarios.forEach((usuario:any) => {
      if(usuario.id == id){
        usuario.activo = !usuario.activo;
        this.check.status=usuario.activo;
      }
      this.check.id=id;
    });
  }

  public eliminar(id:number){
    this.servicioUsuario.eliminar(id).subscribe(res => {
      this.toastr.bien("Consulta Exitosa","¡¡EXITO!!");
      this.listarTodos();
    }, error => {
      this.toastr.mal("Ha ocurrido un error al listar","ERROR");
    });
  }

}
