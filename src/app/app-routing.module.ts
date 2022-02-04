import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaveOlvidadaComponent } from './formularios/clave-olvidada/clave-olvidada.component';
import { InicioSesionComponent } from './formularios/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './formularios/registro/registro.component';
import { LoginGuard } from './guards/login.guard';
import { VistaComponent } from './vista/vista.component';

const routes: Routes = [
  {
    path: '',
    component: InicioSesionComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'clave-olvidada',
    component: ClaveOlvidadaComponent
  },
  {
    path: 'vista',
    component: VistaComponent,
    loadChildren:()=>import('./vista/vista.module').then(mod=>mod.VistaModule),
    canActivate:[LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
