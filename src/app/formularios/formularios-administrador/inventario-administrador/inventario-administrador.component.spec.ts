import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioAdministradorComponent } from './inventario-administrador.component';

describe('InventarioAdministradorComponent', () => {
  let component: InventarioAdministradorComponent;
  let fixture: ComponentFixture<InventarioAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
