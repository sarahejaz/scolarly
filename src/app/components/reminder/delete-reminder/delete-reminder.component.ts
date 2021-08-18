import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reminder } from 'src/app/model/reminder';
import { ApiService } from 'src/app/service/api.service';
import { SafeHtmlPipePipe } from './../../../safe-html-pipe.pipe';

@Component({
  selector: 'app-delete-reminder',
  templateUrl: './delete-reminder.component.html',
  styleUrls: ['./delete-reminder.component.css']
})
export class DeleteReminderComponent implements OnInit {

  myreminder: Reminder;

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


  confirmDelete() {
      this.apiService.deleteReminder(this.myreminder._id).subscribe((data) => {
        window.open("http://localhost:4200/get-reminders", "_self");
      }
    )
  }

}
