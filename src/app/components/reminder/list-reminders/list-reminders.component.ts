import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reminder } from 'src/app/model/reminder';
import { ApiService } from './../../../service/api.service';

@Component({
  selector: 'app-list-reminders',
  templateUrl: './list-reminders.component.html',
  styleUrls: ['./list-reminders.component.css']
})
export class ListRemindersComponent implements OnInit {

  allReminders:any = [];
  dueTime: any;

  doneReminder: Reminder;

  allDoneReminders: any = [];
  allNotDoneReminders: any = [];

  constructor(private apiService: ApiService,
    private router: Router) { 
    this.readReminders();
  }

  ngOnInit(): void {
  }

  readReminders(){
    this.apiService.getReminders().subscribe((data) => {
      this.allReminders = data;

      this.getAllDoneReminders();
      this.getNotDoneReminders();

      this.allDoneReminders.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      this.allNotDoneReminders.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    })
    
  }

  getAllDoneReminders() {
    for (let i = 0; i < this.allReminders.length; i++) {
      if (this.allReminders[i].done==true) {
        this.allDoneReminders.push(this.allReminders[i]);
      }
    }
  }

  getNotDoneReminders() {
    for (let i = 0; i < this.allReminders.length; i++) {
      if (this.allReminders[i].done==false) {
        this.allNotDoneReminders.push(this.allReminders[i]);
      }
    }
  }

  addReminder() {
    this.router.navigate(['/create-reminder']);
  }

  goHome() {
    window.open("http://localhost:4200/home", "_self");
  }

  FieldsChange(values:any, reminder: Reminder){
    console.log(values.currentTarget.checked);
    this.doneReminder =  this.allReminders.find(x => x._id == reminder._id);

    if (this.doneReminder._id) {
      this.doneReminder.done = values.currentTarget.checked;
      //console.log("this.doneReminder.done="+this.doneReminder.done);
      this.apiService.updateReminder(this.doneReminder._id, this.doneReminder)
        .subscribe(res => {
          location.reload();
          console.log('Content updated successfully!');
        }, (error) => {
          console.log(error)
        })
      }
    }

}
