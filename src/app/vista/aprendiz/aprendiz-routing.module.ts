import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialAprendizComponent } from 'src/app/formularios/formularios-aprendiz/historial-aprendiz/historial-aprendiz.component';
import { InventarioAprendizComponent } from 'src/app/formularios/formularios-aprendiz/inventario-aprendiz/inventario-aprendiz.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'historialAprendiz',
    component: HistorialAprendizComponent
  },
  {
    path: 'inventarioAprendiz',
    component: InventarioAprendizComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AprendizRoutingModule { }
