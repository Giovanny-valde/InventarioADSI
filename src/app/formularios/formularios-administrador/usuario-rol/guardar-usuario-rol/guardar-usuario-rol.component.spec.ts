import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarUsuarioRolComponent } from './guardar-usuario-rol.component';

describe('GuardarUsuarioRolComponent', () => {
  let component: GuardarUsuarioRolComponent;
  let fixture: ComponentFixture<GuardarUsuarioRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarUsuarioRolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarUsuarioRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
