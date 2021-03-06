import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingComponent } from './jobposting.component';

describe('JobPostingComponent', () => {
  let component: JobPostingComponent;
  let fixture: ComponentFixture<JobPostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
