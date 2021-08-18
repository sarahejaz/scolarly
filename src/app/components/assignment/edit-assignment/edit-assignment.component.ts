import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from 'src/app/service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SafeHtmlPipePipe } from './../../../safe-html-pipe.pipe';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  id: any;

  constructor(public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.updateAssignment();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.id = id;
    this.getAssignment(id);
    this.editForm = this.fb.group({
      subject: ['', [Validators.required]],
      assignmentNo: ['', [Validators.required, Validators.min(0), Validators.max(30)]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      dueTime: ['', [Validators.required]]
    })
  }

  updateAssignment() {
    this.editForm = this.fb.group({
      subject: ['', [Validators.required]],
      assignmentNo: ['', [Validators.required, Validators.min(0), Validators.max(30)]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      dueTime: ['', [Validators.required]]
    })
  }

  getAssignment(id) {
    this.apiService.getAssignment(id).subscribe(data => {
      this.editForm.setValue({
        subject: data['subject'],
        assignmentNo: data['assignmentNo'],
        description: data['description'],
        dueDate: data['dueDate'],
        dueTime: data['dueTime']
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
        this.apiService.updateAssignment(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/get-assignments');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      
    }
  }

  getViewAssignmentURL() {
    return "http://localhost:4200/view-assignment/"+this.id;
  }

}
