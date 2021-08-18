import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Inject } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: ['./add-timetable.component.css']
})
export class AddTimetableComponent implements OnInit {

  uploadedFiles: Array < File > ;

  constructor(private http: HttpClient, @Inject(DOCUMENT) document,
  public fb: FormBuilder,
  private router: Router,
  private ngZone: NgZone,
  private apiService: ApiService) {
    this.uploadedFiles = []
  }

  ngOnInit() {

  }

  fileChange(element) {
      this.uploadedFiles = element.target.files;
      document.getElementById("displayfilename").innerHTML=this.uploadedFiles[0].name;
  }

  upload() {
      let formData = new FormData();
      for (var i = 0; i < this.uploadedFiles.length; i++) {
          formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
          console.log(formData);
      }


      this.apiService.addTimetable(formData).subscribe(
        (res) => {
          console.log('response received is ', res);
          this.router.navigate(['/get-timetables']);
  
        }, (error) => {
          console.log(error);
        });
    
  }

}
