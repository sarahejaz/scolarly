import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-delete-timetable',
  templateUrl: './delete-timetable.component.html',
  styleUrls: ['./delete-timetable.component.css']
})
export class DeleteTimetableComponent implements OnInit {

  fileName:any;

  constructor(public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.fileName=id;
    var name = this.fileName.split("/");
    this.fileName = name[name.length-1];


  }

  ngOnInit(): void {
  }

  confirmDelete() {
    console.log(this.fileName);
    this.apiService.deleteTimetable(this.fileName).subscribe((data) => {
      window.open("http://localhost:4200/get-timetables", "_self");
    }
  )
}

}
