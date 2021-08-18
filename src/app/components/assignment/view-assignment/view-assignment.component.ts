import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Assignment } from 'src/app/model/assignment';
import { SafeHtmlPipePipe } from './../../../safe-html-pipe.pipe';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css']
})
export class ViewAssignmentComponent implements OnInit {

  myassignment: Assignment;
  dueTime: any;

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
      this.dueTime = this.myassignment.dueTime.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [this.myassignment.dueTime];

      if (this.dueTime.length > 1) { // If time format correct
        this.dueTime = this.dueTime.slice (1);  // Remove full string match value
        this.dueTime[5] = +this.dueTime[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        this.dueTime[0] = +this.dueTime[0] % 12 || 12; // Adjust hours
      }

      this.myassignment.dueTime = this.dueTime.join ('');  //https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
    });
  }

  editAssignment() {
    this.router.navigate(['/edit-assignment/', this.myassignment._id]);
  }

}
