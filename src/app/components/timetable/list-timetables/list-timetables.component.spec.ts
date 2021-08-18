import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTimetablesComponent } from './list-timetables.component';

describe('ListTimetablesComponent', () => {
  let component: ListTimetablesComponent;
  let fixture: ComponentFixture<ListTimetablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTimetablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTimetablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
