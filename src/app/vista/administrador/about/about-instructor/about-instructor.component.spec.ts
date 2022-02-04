import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutInstructorComponent } from './about-instructor.component';

describe('AboutInstructorComponent', () => {
  let component: AboutInstructorComponent;
  let fixture: ComponentFixture<AboutInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
