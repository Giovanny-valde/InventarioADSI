import { Toastr } from 'src/app/material/toastr.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from 'src/app/modelos/rol'
import { RolService } from 'src/app/servicios/rol.service';

@Component({
  selector: 'app-guardar-rol',
  templateUrl: './guardar-rol.component.html',
  styleUrls: ['./guardar-rol.component.css']
})
export class GuardarRolComponent implements OnInit {

  public formrol!: FormGroup;
  public listaRol!: any ;  // lista de roles
  public rol: any=[] ;
  public idrol! : number;

  constructor(
    private toastr: Toastr,
    private fb: FormBuilder,
    private servicioRol: RolService,
    public dialogRef: MatDialogRef<GuardarRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    if(this.data.id != 0){
    this.listarporid(this.data.id);
    }
  }

  private crearFormulario(){
    this.formrol = this.fb.group({
      id: [''],
      nombre: [null,Validators.required],
      activo: [null,Validators.required]
    });
  }

  public guardar() {
    let rol : Rol = new Rol();
    rol.nombre = this.formrol.controls['nombre'].value;
    rol.activo = this.formrol.controls['activo'].value;
    console.log(rol);
    if(this.data.id == 0){
      this.registarRol(rol);
    }
    else{
      rol.id=this.data.id;
      this.actualizarRol(rol)
    };
  }

  public registarRol(rol: Rol) {
    this.servicioRol.registrar(rol).subscribe(res => {
      this.dialogRef.close();
      this.toastr.bien("Registro Exitoso","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al agregar","ERROR");
    });
  }

  public actualizarRol(rol: Rol) {
    this.servicioRol.actualizar(rol).subscribe(res => {
      this.dialogRef.close(true);
      this.toastr.bien("Actulizacion Exitosa","¡¡EXITO!!");
    }, error => {
      this.toastr.mal("Ha ocurrido un error al actualizar","ERROR");
    });
  }

  public listarporid(id: number) {
    this.servicioRol.listarPorId(id).subscribe(res => {
      this.toastr.bien("Consulta Exitosa","¡¡EXITO!!");
      this.rol.json = res;
      console.log(this.rol);
      this.formrol.controls['id'].setValue(this.data.Id);
      this.formrol.controls['nombre'].setValue(this.rol.json.data.Nombre);
      this.formrol.controls['activo'].setValue(this.rol.json.data.Activo);
    }, error => {
      this.toastr.mal("Ha ocurrido un error al listar","ERROR");
    });
  }
}
