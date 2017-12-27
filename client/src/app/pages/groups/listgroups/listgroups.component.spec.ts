import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgroupsComponent } from './listgroups.component';

describe('ListgroupsComponent', () => {
  let component: ListgroupsComponent;
  let fixture: ComponentFixture<ListgroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListgroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
