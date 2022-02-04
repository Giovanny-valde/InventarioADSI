import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarSedeComponent } from './guardar-sede.component';

describe('GuardarSedeComponent', () => {
  let component: GuardarSedeComponent;
  let fixture: ComponentFixture<GuardarSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarSedeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
