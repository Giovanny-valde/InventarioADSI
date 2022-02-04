import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioAprendizComponent } from './inventario-aprendiz.component';

describe('InventarioAprendizComponent', () => {
  let component: InventarioAprendizComponent;
  let fixture: ComponentFixture<InventarioAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioAprendizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
