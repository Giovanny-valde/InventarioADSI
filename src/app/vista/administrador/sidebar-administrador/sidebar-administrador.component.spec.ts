import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAdministradorComponent } from './sidebar-administrador.component';

describe('SidebarAdministradorComponent', () => {
  let component: SidebarAdministradorComponent;
  let fixture: ComponentFixture<SidebarAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
