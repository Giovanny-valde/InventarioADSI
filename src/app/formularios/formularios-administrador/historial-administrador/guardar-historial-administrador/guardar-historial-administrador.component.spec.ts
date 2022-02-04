import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarHistorialAdministradorComponent } from './guardar-historial-administrador.component';

describe('GuardarHistorialAdministradorComponent', () => {
  let component: GuardarHistorialAdministradorComponent;
  let fixture: ComponentFixture<GuardarHistorialAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarHistorialAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarHistorialAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
