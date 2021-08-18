import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-reminder',
  templateUrl: './create-reminder.component.html',
  styleUrls: ['./create-reminder.component.css']
})
export class CreateReminderComponent implements OnInit {

  submitted = false;
  reminderForm: FormGroup;
  check:any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit(): void {
  }

  mainForm() {
    this.reminderForm = this.fb.group({
      title: ['', [Validators.required]],
      //assignmentNo: ['', [Validators.required, Validators.min(0), Validators.max(30)]],
      description: ['', [Validators.minLength(0)]],
      dueDate: ['', [Validators.minLength(0)]]
    })
  }

  get myForm(){
    return this.reminderForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    //console.log(this.reminderForm.value.dueTime);

    if (!this.reminderForm.valid) {
      //console.log(this.userForm.value.name);
      console.log("not working!!!!!!!!");
      console.log(this.reminderForm.valid);
  
      console.log("here");
      return false;
    } else {
      this.apiService.createReminder(this.reminderForm.value).subscribe(
        (res) => {
          //console.log(this.reminderForm.value.subject);
          //console.log(this.reminderForm.value.dueTime);
          //console.log('Assignment successfully created!');
          //console.log(res);
  
          //this.ngZone.run(() => this.router.navigateByUrl('/'));
          window.open("http://localhost:4200/get-reminders", "_self");
  
        }, (error) => {
          console.log(error);
        });
    }
    console.log(this.reminderForm.value.description);
  }

}
