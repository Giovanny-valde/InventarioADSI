import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarPersonaComponent } from './guardar-persona.component';

describe('GuardarPersonaComponent', () => {
  let component: GuardarPersonaComponent;
  let fixture: ComponentFixture<GuardarPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
