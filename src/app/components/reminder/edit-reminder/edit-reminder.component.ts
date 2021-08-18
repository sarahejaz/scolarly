import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from 'src/app/service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-reminder',
  templateUrl: './edit-reminder.component.html',
  styleUrls: ['./edit-reminder.component.css']
})
export class EditReminderComponent implements OnInit {

  submitted = false;
  editForm: FormGroup;
  id: any;

  constructor(public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.updateReminder();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.id = id;
    this.getReminder(id);
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      //assignmentNo: ['', [Validators.required, Validators.min(0), Validators.max(30)]],
      description: ['', [Validators.minLength(0)]],
      dueDate: ['', [Validators.minLength(0)]]
    })
  }

  updateReminder() {
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      //assignmentNo: ['', [Validators.required, Validators.min(0), Validators.max(30)]],
      description: ['', [Validators.minLength(0)]],
      dueDate: ['', [Validators.minLength(0)]]
    })
  }

  getReminder(id) {
    this.apiService.getReminder(id).subscribe(data => {
      this.editForm.setValue({
        title: data['title'],
        //assignmentNo: ['', [Validators.required, Validators.min(0), Validators.max(30)]],
        description: data['description'],
        dueDate: data['dueDate']
      });
    });
  }

  get myForm() {
    return this.editForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateReminder(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/get-reminders');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      
    }
  }

  getViewReminderURL() {
    return "http://localhost:4200/view-reminder/"+this.id;
  }

}
