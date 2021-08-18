import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { SafeHtmlPipePipe } from './../../../safe-html-pipe.pipe';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {

  submitted = false;
  assignmentForm: FormGroup;
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
    this.assignmentForm = this.fb.group({
      subject: ['', [Validators.required]],
      assignmentNo: ['', [Validators.required, Validators.min(0), Validators.max(30)]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      dueTime: ['', [Validators.required]]
    })
  }

  get myForm(){
    return this.assignmentForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.assignmentForm.value.dueTime);

    if (!this.assignmentForm.valid) {
      //console.log(this.userForm.value.name);
      console.log("not working!!!!!!!!");
      console.log(this.assignmentForm.valid);
  
      console.log("here");
      return false;
    } else {
      this.apiService.createAssignment(this.assignmentForm.value).subscribe(
        (res) => {
          console.log(this.assignmentForm.value.subject);
          console.log(this.assignmentForm.value.dueTime);
          console.log('Assignment successfully created!');
          //console.log(res);
  
          //this.ngZone.run(() => this.router.navigateByUrl('/'));
          window.open("http://localhost:4200/get-assignments", "_self");
  
        }, (error) => {
          console.log(error);
        });
    }
    console.log(this.assignmentForm.value.description);
  }

}
