import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarEstadoComponent } from './guardar-estado.component';

describe('GuardarEstadoComponent', () => {
  let component: GuardarEstadoComponent;
  let fixture: ComponentFixture<GuardarEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
