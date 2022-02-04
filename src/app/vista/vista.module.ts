import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './administrador/administrador.component';
import { AprendizComponent } from './aprendiz/aprendiz.component';
import { VistaComponent } from './vista.component';
import { VistaRoutingModule } from './vista-routing.module';
import { SidebarComponent } from '../menu/sidebar/sidebar.component';
import { SidebarAdministradorComponent } from './administrador/sidebar-administrador/sidebar-administrador.component';
import { SidebarAprendizComponent } from './aprendiz/sidebar-aprendiz/sidebar-aprendiz.component';
import { NavbarComponent } from '../menu/navbar/navbar.component';
import { NavbarAdministradorComponent } from './administrador/navbar-administrador/navbar-administrador.component';
import { NavbarAprendizComponent } from './aprendiz/navbar-aprendiz/navbar-aprendiz.component';
import { FooterComponent } from '../menu/footer/footer.component';

@NgModule({
  declarations: [
    VistaComponent,
    AdministradorComponent,
    AprendizComponent,
    SidebarComponent,
    SidebarAdministradorComponent,
    SidebarAprendizComponent,
    NavbarComponent,
    NavbarAdministradorComponent,
    NavbarAprendizComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    VistaRoutingModule
  ]
})
export class VistaModule { }
