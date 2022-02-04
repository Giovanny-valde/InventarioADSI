import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador/administrador.component';
import { AprendizComponent } from './aprendiz/aprendiz.component';
import { VerificarRolGuard } from '../guards/verificar-rol.guard';
const routes: Routes = [
  {
    path: 'aprendiz',
    component: AprendizComponent,
    loadChildren:()=>import('./aprendiz/aprendiz.module').then(mod=>mod.AprendizModule),
    canActivate:[VerificarRolGuard],
    data:{
      rol:14
    }
  },
  {
    path: 'administrador',
    component: AdministradorComponent,
    loadChildren:()=>import('./administrador/administrador.module').then(mod=>mod.AdministradorModule),
    canActivate:[VerificarRolGuard],
    data:{
      rol:13
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistaRoutingModule { }
