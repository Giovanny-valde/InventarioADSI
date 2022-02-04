import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarInventarioAdministradorComponent } from './guardar-inventario-administrador.component';

describe('GuardarInventarioAdministradorComponent', () => {
  let component: GuardarInventarioAdministradorComponent;
  let fixture: ComponentFixture<GuardarInventarioAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarInventarioAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarInventarioAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
