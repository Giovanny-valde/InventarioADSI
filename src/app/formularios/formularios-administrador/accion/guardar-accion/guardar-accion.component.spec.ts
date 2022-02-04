import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarAccionComponent } from './guardar-accion.component';

describe('GuardarAccionComponent', () => {
  let component: GuardarAccionComponent;
  let fixture: ComponentFixture<GuardarAccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarAccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
