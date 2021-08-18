import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormArray, FormControl } from '@angular/forms';
import { ApiService } from './../../../service/api.service';
import { SafeHtmlPipePipe } from './../../../safe-html-pipe.pipe';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/model/assignment';

@Component({
  selector: 'app-list-assignments',
  templateUrl: './list-assignments.component.html',
  styleUrls: ['./list-assignments.component.css']
})
export class ListAssignmentsComponent implements OnInit {

  allAssignments:any = [];
  dueTime: any;

  doneAssignment: Assignment;

  allDoneAssignments: any = [];
  allNotDoneAssignments: any = [];

  constructor(private apiService: ApiService,
    private router: Router) { 
    this.readAssignments();
  }

  ngOnInit(): void {
  }

  readAssignments(){
    this.apiService.getAssignments().subscribe((data) => {
      this.allAssignments = data;
      console.log(data);
      for (let i = 0; i < this.allAssignments.length ; i++) {
        this.dueTime = this.allAssignments[i].dueTime.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [this.allAssignments[i].dueTime];

        if (this.dueTime.length > 1) { // If time format correct
          this.dueTime = this.dueTime.slice (1);  // Remove full string match value
          this.dueTime[5] = +this.dueTime[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
          this.dueTime[0] = +this.dueTime[0] % 12 || 12; // Adjust hours
        }
  
        this.allAssignments[i].dueTime = this.dueTime.join ('');  //https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
      }
      this.getAllDoneAssignments();
      this.getNotDoneAssignments();

      this.allDoneAssignments.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      this.allNotDoneAssignments.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    })
    
  }

  getAllDoneAssignments() {
    for (let i = 0; i < this.allAssignments.length; i++) {
      if (this.allAssignments[i].done==true) {
        this.allDoneAssignments.push(this.allAssignments[i]);
      }
    }
  }

  getNotDoneAssignments() {
    for (let i = 0; i < this.allAssignments.length; i++) {
      if (this.allAssignments[i].done==false) {
        this.allNotDoneAssignments.push(this.allAssignments[i]);
      }
    }
  }

  addAssignment() {
    this.router.navigate(['/create-assignment']);
  }

  goHome() {
    window.open("http://localhost:4200/home", "_self");
  }

  FieldsChange(values:any, assignment: Assignment){
    console.log(values.currentTarget.checked);
    this.doneAssignment =  this.allAssignments.find(x => x._id == assignment._id);

    if (this.doneAssignment._id) {
      this.doneAssignment.done = values.currentTarget.checked;
      console.log("this.doneAssignment.done="+this.doneAssignment.done);
      this.apiService.updateAssignment(this.doneAssignment._id, this.doneAssignment)
        .subscribe(res => {
          location.reload();
          console.log('Content updated successfully!');
        }, (error) => {
          console.log(error)
        })
      }
    }


}
