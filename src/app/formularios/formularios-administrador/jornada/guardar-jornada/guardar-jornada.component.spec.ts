import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarJornadaComponent } from './guardar-jornada.component';

describe('GuardarJornadaComponent', () => {
  let component: GuardarJornadaComponent;
  let fixture: ComponentFixture<GuardarJornadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarJornadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
