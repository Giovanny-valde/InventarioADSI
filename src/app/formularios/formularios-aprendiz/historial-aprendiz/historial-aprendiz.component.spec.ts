import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAprendizComponent } from './historial-aprendiz.component';

describe('HistorialAprendizComponent', () => {
  let component: HistorialAprendizComponent;
  let fixture: ComponentFixture<HistorialAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialAprendizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
