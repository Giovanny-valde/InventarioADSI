import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarContraseñaComponent } from './cambiar-contraseña.component';

describe('SidebarAdministradorComponent', () => {
  let component: CambiarContraseñaComponent;
  let fixture: ComponentFixture<CambiarContraseñaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarContraseñaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarContraseñaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});