import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerSearchComponent } from './seekersearch.component';

describe('SeekerSearchComponent', () => {
  let component: SeekerSearchComponent;
  let fixture: ComponentFixture<SeekerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
