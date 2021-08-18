import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-view-timetable',
  templateUrl: './view-timetable.component.html',
  styleUrls: ['./view-timetable.component.css']
})
export class ViewTimetableComponent implements OnInit {

  fileName:any = "";
  imageBool:Boolean=false;

  totalPages: number;
  page: number = 1;
  isLoaded: boolean = false;


     nextPage() {
        this.page += 1;
      }

      previousPage() {
        this.page -= 1;
      }

      afterLoadComplete(pdfData: any) {
        this.totalPages = pdfData.numPages;
        this.isLoaded = true;
      }

  constructor(public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) {
      let id = this.actRoute.snapshot.paramMap.get('id');
      console.log(id);
      this.fileName=id;
      var name = this.fileName.split(".");
      if (name[name.length-1]=="jpg" || name[name.length-1]=="jpeg" || name[name.length-1]=="png" || name[name.length-1]=="gif"
      || name[name.length-1]=="JPG" || name[name.length-1]=="JPEG" || name[name.length-1]=="PNG" || name[name.length-1]=="GIF")
      {
        this.imageBool = true;
      }
    }

  ngOnInit(): void {
  }

  getUrl(): any {
    return this.fileName;
  }

}
