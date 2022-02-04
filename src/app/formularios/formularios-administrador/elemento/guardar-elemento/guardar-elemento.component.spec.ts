import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarElementoComponent } from './guardar-elemento.component';

describe('GuardarElementoComponent', () => {
  let component: GuardarElementoComponent;
  let fixture: ComponentFixture<GuardarElementoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarElementoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
