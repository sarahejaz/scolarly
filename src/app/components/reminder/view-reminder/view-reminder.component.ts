import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Reminder } from 'src/app/model/reminder';

@Component({
  selector: 'app-view-reminder',
  templateUrl: './view-reminder.component.html',
  styleUrls: ['./view-reminder.component.css']
})
export class ViewReminderComponent implements OnInit {

  myreminder: Reminder;
  //dueTime: any;

  constructor(public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) {
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.getReminder(id); 
    }

  ngOnInit(): void {

  }

  getReminder(id) {
    this.apiService.getReminder(id).subscribe(data => {
      this.myreminder = data;
    });
  }

  editReminder() {
    this.router.navigate(['/edit-reminder/', this.myreminder._id]);
  }

}
