import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarZonaComponent } from './guardar-zona.component';

describe('GuardarZonaComponent', () => {
  let component: GuardarZonaComponent;
  let fixture: ComponentFixture<GuardarZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarZonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
