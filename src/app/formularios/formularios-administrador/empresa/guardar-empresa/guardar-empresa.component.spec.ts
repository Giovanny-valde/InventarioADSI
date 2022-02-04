import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarEmpresaComponent } from './guardar-empresa.component';

describe('GuardarEmpresaComponent', () => {
  let component: GuardarEmpresaComponent;
  let fixture: ComponentFixture<GuardarEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
