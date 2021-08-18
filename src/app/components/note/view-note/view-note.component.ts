import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Note } from 'src/app/model/note';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.css']
})
export class ViewNoteComponent implements OnInit {

  mynote: Note;

  constructor(public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) {
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.getNote(id);
    }

  ngOnInit(): void {

  }

  getNote(id) {
    this.apiService.getNote(id).subscribe(data => {
      this.mynote = data;
    });
  }

  editNote() {
    this.router.navigate(['/edit-note/', this.mynote._id]);
  }


}
