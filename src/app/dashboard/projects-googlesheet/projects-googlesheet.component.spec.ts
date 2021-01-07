import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsGooglesheetComponent } from './projects-googlesheet.component';

describe('ProjectsGooglesheetComponent', () => {
  let component: ProjectsGooglesheetComponent;
  let fixture: ComponentFixture<ProjectsGooglesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsGooglesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsGooglesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
