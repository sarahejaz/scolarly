import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
  }

  goToNotes() {
    //this.ngZone.run(() => this.router.navigateByUrl('/createNote'));
    window.open("http://localhost:4200/get-notes", "_self");
  }

  goToAssignments() {
    //this.ngZone.run(() => this.router.navigateByUrl('/createNote'));
    window.open("http://localhost:4200/get-assignments", "_self");
  }

  goToReminders() {
    //this.ngZone.run(() => this.router.navigateByUrl('/createNote'));
    window.open("http://localhost:4200/get-reminders", "_self");
  }

  goToTimetables() {
    //this.ngZone.run(() => this.router.navigateByUrl('/createNote'));
    window.open("http://localhost:4200/get-timetables", "_self");
  }

  goToHelp() {
    //this.ngZone.run(() => this.router.navigateByUrl('/createNote'));
    window.open("http://localhost:4200/help", "_self");
  }

}
