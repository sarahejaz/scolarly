import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-timetables',
  templateUrl: './list-timetables.component.html',
  styleUrls: ['./list-timetables.component.css']
})
export class ListTimetablesComponent implements OnInit {

  allTimetables:any = [];

  pdfType:any = [];
  imageType:any=[];

  constructor(private http: HttpClient,
  public fb: FormBuilder,
  private router: Router,
  private ngZone: NgZone,
  private apiService: ApiService,
  private sanitizer: DomSanitizer) {
    this.readTimetables();
  }

  ngOnInit(): void {}

  readTimetables() {
    this.apiService.getTimetables().subscribe((data) => {
      this.allTimetables = data;
      
      for (var i = 0; i < this.allTimetables.length; i++) {
        var name = this.allTimetables[i].split(".");
        if (name[name.length-1]=="jpg" || name[name.length-1]=="jpeg" || name[name.length-1]=="png" || name[name.length-1]=="gif"
        || name[name.length-1]=="JPG" || name[name.length-1]=="JPEG" || name[name.length-1]=="PNG" || name[name.length-1]=="GIF")
        {
          this.imageType.push(this.allTimetables[i]);
        }
        if (name[name.length-1]=="pdf" || name[name.length-1]=="PDF") {
          this.pdfType.push(this.allTimetables[i]);
        }
      }
    })

    
  }

  getImageUrl(imageId: number): any {
    return ("/assets/uploads/"+this.imageType[imageId]);
  }

  getPdfUrl(pdfId: number): any {
    return ("/assets/uploads/"+this.pdfType[pdfId]);
  }

  getImageName(imageId: number): any {
    return (this.imageType[imageId]);
  }

  getPdfName(pdfId: number): any {
    return (this.pdfType[pdfId]);
  }

  getUrl(id: number) {
    return ("/assets/uploads/"+this.allTimetables[id]);
  }

  goHome() {
    window.open("http://localhost:4200/home", "_self");
  }

  addTimetable() {
    this.router.navigate(['/add-timetable']);
  }

}
