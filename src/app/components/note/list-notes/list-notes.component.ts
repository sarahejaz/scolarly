import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormArray, FormControl } from '@angular/forms';
import { ApiService } from './../../../service/api.service';
import { SafeHtmlPipePipe } from './../../../safe-html-pipe.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {

  allNotes:any = [];

  constructor(private apiService: ApiService,
    private router: Router) { 
    this.readNotes();
  }

  ngOnInit(): void {
  }

  readNotes(){
    this.apiService.getNotes().subscribe((data) => {
     this.allNotes = data;
    })    
  }

  addNote() {
    this.router.navigate(['/create-note']);
  }

  goHome() {
    window.open("http://localhost:4200/home", "_self");
  }
  

}
