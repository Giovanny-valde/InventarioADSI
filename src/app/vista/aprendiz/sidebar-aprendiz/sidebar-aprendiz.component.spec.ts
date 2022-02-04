import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAprendizComponent } from './sidebar-aprendiz.component';

describe('SidebarAprendizComponent', () => {
  let component: SidebarAprendizComponent;
  let fixture: ComponentFixture<SidebarAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarAprendizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
