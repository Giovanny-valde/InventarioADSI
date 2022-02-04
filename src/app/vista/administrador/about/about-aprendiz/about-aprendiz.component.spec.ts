import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAprendizComponent } from './about-aprendiz.component';

describe('AboutAprendizComponent', () => {
  let component: AboutAprendizComponent;
  let fixture: ComponentFixture<AboutAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutAprendizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
