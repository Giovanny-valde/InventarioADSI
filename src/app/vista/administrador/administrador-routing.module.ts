import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccionComponent } from 'src/app/formularios/formularios-administrador/accion/accion.component';
import { AmbienteComponent } from 'src/app/formularios/formularios-administrador/ambiente/ambiente.component';
import { ElementoComponent } from 'src/app/formularios/formularios-administrador/elemento/elemento.component';
import { EmpresaComponent } from 'src/app/formularios/formularios-administrador/empresa/empresa.component';
import { EstadoComponent } from 'src/app/formularios/formularios-administrador/estado/estado.component';
import { HistorialAdministradorComponent } from 'src/app/formularios/formularios-administrador/historial-administrador/historial-administrador.component';
import { InventarioAdministradorComponent } from 'src/app/formularios/formularios-administrador/inventario-administrador/inventario-administrador.component';
import { JornadaComponent } from 'src/app/formularios/formularios-administrador/jornada/jornada.component';
import { PersonaComponent } from 'src/app/formularios/formularios-administrador/persona/persona.component';
import { RolComponent } from 'src/app/formularios/formularios-administrador/rol/rol.component';
import { SedeComponent } from 'src/app/formularios/formularios-administrador/sede/sede.component';
import { UsuarioRolComponent } from 'src/app/formularios/formularios-administrador/usuario-rol/usuario-rol.component';
import { UsuarioComponent } from 'src/app/formularios/formularios-administrador/usuario/usuario.component';
import { ZonaComponent } from 'src/app/formularios/formularios-administrador/zona/zona.component';
import { AboutAprendizComponent } from './about/about-aprendiz/about-aprendiz.component';
import { AboutInstructorComponent } from './about/about-instructor/about-instructor.component';
import { AboutComponent } from './about/about.component';
import { CambiarContraseñaComponent } from './cambiar-contraseña/cambiar-contraseña.component';

const routes: Routes = [
  {
    path: 'seguridad',
    children: [
      {
        path: 'persona',
        component: PersonaComponent
      },
      {
        path: 'usuario',
        component: UsuarioComponent
      },
      {
        path: 'uzuariorol',
        component: UsuarioRolComponent
      },
      {
        path: 'accion',
        component: AccionComponent
      },
      {
        path: 'rol',
        component: RolComponent
      }
    ]
  },
  {
    path: 'parametros',
    children: [
      {
        path: 'empresa',
        component: EmpresaComponent
      },
      {
        path: 'sede',
        component: SedeComponent
      },
      {
        path: 'jornada',
        component: JornadaComponent
      }

    ]
  },
  {
    path: 'inventario',
    children: [
      {
        path: 'inventarioadministrador',
        component: InventarioAdministradorComponent
      },
      {
        path: 'elemento',
        component: ElementoComponent
      },
      {
        path: 'zona',
        component: ZonaComponent
      },
      {
        path: 'ambiente',
        component: AmbienteComponent
      },
      {
        path: 'estado',
        component: EstadoComponent
      }
    ]
  },
  {
    path: 'inventarioaprendis',
    children: [
      {
        path: 'historialadministrador',
        component: HistorialAdministradorComponent
      }
    ]
  },
  {
    path: 'about',
    component: AboutComponent
  },{
    path: 'cambiarcontraseña',
    component: CambiarContraseñaComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
