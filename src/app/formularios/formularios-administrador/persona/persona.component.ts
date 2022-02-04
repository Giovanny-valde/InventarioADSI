import { Toastr } from 'src/app/material/toastr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonaService } from 'src/app/servicios/persona.service';
import { GuardarPersonaComponent } from './guardar-persona/guardar-persona.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

   public listaPersonas: any = [];  // lista de Persona
   public retornoPersona: any = [];

   displayedColumns = ['Id','Nombre','Apellido','Documento','TipoDocumento','Telefono','Email','Direccion','Opciones'];
   dataSource!:MatTableDataSource<any>;

   @ViewChild('paginator') paginator! : MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;

  constructor(
     private toastr: Toastr,
     private servicioPersona: PersonaService,
     public  dialog: MatDialog,
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
     this.servicioPersona.listarTodos().subscribe(res => {
      this.retornoPersona.json = res;
      this.listaPersonas = this.retornoPersona.json.data;
      this.dataSource = new MatTableDataSource(this.listaPersonas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  public modalGuardarPersona(id: number) {
    const dialogRef = this.dialog.open(GuardarPersonaComponent, {
      height: '700px',
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
    this.listaPersonas.forEach((persona:any) => {
      if(persona.id == id){
        persona.activo = !persona.activo;
        this.check.status=persona.activo;
      }
      this.check.id=id;
    });
    alert("id: "+this.check.id+" status: "+this.check.status);
  }

  public eliminar(id:number){
    this.servicioPersona.eliminar(id).subscribe(res => {
      this.toastr.bien("Eliminado con exito","¡¡EXITO!!");
      this.listarTodos();
    }, error => {
      this.toastr.mal("Error al eliminar","ERROR");
    });
  }

}

