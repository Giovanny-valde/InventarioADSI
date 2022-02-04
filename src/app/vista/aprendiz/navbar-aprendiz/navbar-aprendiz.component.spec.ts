import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAprendizComponent } from './navbar-aprendiz.component';

describe('NavbarAprendizComponent', () => {
  let component: NavbarAprendizComponent;
  let fixture: ComponentFixture<NavbarAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarAprendizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
