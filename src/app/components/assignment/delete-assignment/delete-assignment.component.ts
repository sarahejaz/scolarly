import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/model/assignment';
import { ApiService } from 'src/app/service/api.service';
import { SafeHtmlPipePipe } from './../../../safe-html-pipe.pipe';

@Component({
  selector: 'app-delete-assignment',
  templateUrl: './delete-assignment.component.html',
  styleUrls: ['./delete-assignment.component.css']
})
export class DeleteAssignmentComponent implements OnInit {

  myassignment: Assignment;

  constructor(public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) {
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.getAssignment(id);
    }

  ngOnInit(): void {

  }

  getAssignment(id) {
    this.apiService.getAssignment(id).subscribe(data => {
      this.myassignment = data;
    });
  }


  confirmDelete() {
      this.apiService.deleteAssignment(this.myassignment._id).subscribe((data) => {
        window.open("http://localhost:4200/get-assignments", "_self");
      }
    )
  }

}
