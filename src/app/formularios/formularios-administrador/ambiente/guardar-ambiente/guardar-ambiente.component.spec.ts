import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarAmbienteComponent } from './guardar-ambiente.component';

describe('GuardarAmbienteComponent', () => {
  let component: GuardarAmbienteComponent;
  let fixture: ComponentFixture<GuardarAmbienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarAmbienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
