import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAdministradorComponent } from './historial-administrador.component';

describe('HistorialAdministradorComponent', () => {
  let component: HistorialAdministradorComponent;
  let fixture: ComponentFixture<HistorialAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
