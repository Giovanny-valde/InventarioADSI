import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { PersonaComponent } from 'src/app/formularios/formularios-administrador/persona/persona.component';
import { GuardarPersonaComponent } from 'src/app/formularios/formularios-administrador/persona/guardar-persona/guardar-persona.component';
import { UsuarioComponent } from 'src/app/formularios/formularios-administrador/usuario/usuario.component';
import { GuardarUsuarioComponent } from 'src/app/formularios/formularios-administrador/usuario/guardar-usuario/guardar-usuario.component';
import { UsuarioRolComponent } from 'src/app/formularios/formularios-administrador/usuario-rol/usuario-rol.component';
import { GuardarUsuarioRolComponent } from 'src/app/formularios/formularios-administrador/usuario-rol/guardar-usuario-rol/guardar-usuario-rol.component';
import { AccionComponent } from 'src/app/formularios/formularios-administrador/accion/accion.component';
import { GuardarAccionComponent } from 'src/app/formularios/formularios-administrador/accion/guardar-accion/guardar-accion.component';
import { RolComponent } from 'src/app/formularios/formularios-administrador/rol/rol.component';
import { GuardarRolComponent } from 'src/app/formularios/formularios-administrador/rol/guardar-rol/guardar-rol.component';
import { EmpresaComponent } from 'src/app/formularios/formularios-administrador/empresa/empresa.component';
import { GuardarempresaComponent } from 'src/app/formularios/formularios-administrador/empresa/guardar-empresa/guardar-empresa.component';
import { SedeComponent } from 'src/app/formularios/formularios-administrador/sede/sede.component';
import { GuardarSedeComponent } from 'src/app/formularios/formularios-administrador/sede/guardar-sede/guardar-sede.component';
import { JornadaComponent } from 'src/app/formularios/formularios-administrador/jornada/jornada.component';
import { GuardarJornadaComponent } from 'src/app/formularios/formularios-administrador/jornada/guardar-jornada/guardar-jornada.component';
import { InventarioAdministradorComponent } from 'src/app/formularios/formularios-administrador/inventario-administrador/inventario-administrador.component';
import { GuardarInventarioAdministradorComponent } from 'src/app/formularios/formularios-administrador/inventario-administrador/guardar-inventario-administrador/guardar-inventario-administrador.component';
import { ElementoComponent } from 'src/app/formularios/formularios-administrador/elemento/elemento.component';
import { GuardarElementoComponent } from 'src/app/formularios/formularios-administrador/elemento/guardar-elemento/guardar-elemento.component';
import { ZonaComponent } from 'src/app/formularios/formularios-administrador/zona/zona.component';
import { GuardarZonaComponent } from 'src/app/formularios/formularios-administrador/zona/guardar-zona/guardar-zona.component';
import { AmbienteComponent } from 'src/app/formularios/formularios-administrador/ambiente/ambiente.component';
import { GuardarAmbienteComponent } from 'src/app/formularios/formularios-administrador/ambiente/guardar-ambiente/guardar-ambiente.component';
import { EstadoComponent } from 'src/app/formularios/formularios-administrador/estado/estado.component';
import { GuardarEstadoComponent } from 'src/app/formularios/formularios-administrador/estado/guardar-estado/guardar-estado.component';
import { HistorialAdministradorComponent } from 'src/app/formularios/formularios-administrador/historial-administrador/historial-administrador.component';
import { GuardarHistorialAdministradorComponent } from 'src/app/formularios/formularios-administrador/historial-administrador/guardar-historial-administrador/guardar-historial-administrador.component';
import { AboutComponent } from './about/about.component';
import { AboutAprendizComponent } from './about/about-aprendiz/about-aprendiz.component';
import { AboutInstructorComponent } from './about/about-instructor/about-instructor.component';
import { CambiarContraseñaComponent } from './cambiar-contraseña/cambiar-contraseña.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { InventarioDetalleComponent } from 'src/app/formularios/formularios-administrador/inventario-administrador/guardar-inventario-administrador/inventario-detalle/inventario-detalle.component';


@NgModule({
  declarations: [
    PersonaComponent,
    GuardarPersonaComponent,
    UsuarioComponent,
    GuardarUsuarioComponent,
    UsuarioRolComponent,
    GuardarUsuarioRolComponent,
    AccionComponent,
    GuardarAccionComponent,
    RolComponent,
    GuardarRolComponent,
    EmpresaComponent,
    GuardarempresaComponent,
    SedeComponent,
    GuardarSedeComponent,
    JornadaComponent,
    GuardarJornadaComponent,
    InventarioAdministradorComponent,
    GuardarInventarioAdministradorComponent,
    ElementoComponent,
    GuardarElementoComponent,
    ZonaComponent,
    GuardarZonaComponent,
    AmbienteComponent,
    GuardarAmbienteComponent,
    EstadoComponent,
    GuardarEstadoComponent,
    HistorialAdministradorComponent,
    GuardarHistorialAdministradorComponent,
    AboutComponent,
    AboutAprendizComponent,
    AboutInstructorComponent,
    CambiarContraseñaComponent,
    InventarioDetalleComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule

  ]
})
export class AdministradorModule { }
