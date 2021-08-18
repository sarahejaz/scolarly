import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRemindersComponent } from './list-reminders.component';

describe('ListRemindersComponent', () => {
  let component: ListRemindersComponent;
  let fixture: ComponentFixture<ListRemindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRemindersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
