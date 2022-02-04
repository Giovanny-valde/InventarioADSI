import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialAprendizComponent } from 'src/app/formularios/formularios-aprendiz/historial-aprendiz/historial-aprendiz.component';
import { InventarioAprendizComponent } from 'src/app/formularios/formularios-aprendiz/inventario-aprendiz/inventario-aprendiz.component';
import { AprendizRoutingModule } from './aprendiz-routing.module';
import { HomeComponent } from './home/home.component';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HistorialAprendizComponent,
    InventarioAprendizComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AprendizRoutingModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule
  ]
})
export class AprendizModule { }
