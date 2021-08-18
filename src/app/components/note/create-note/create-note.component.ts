import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { FormArray, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  submitted = false;
  noteForm: FormGroup;
  check:any;

  @ViewChild('fromRTE')
  private rteEle: RichTextEditorComponent;
  public value: string = null;
    rteCreated(): void {
      this.rteEle.element.focus();
  }

  public tools: object = {
    items: [
           'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
           'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
           'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
           'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
           'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
           'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
   };

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit(): void {
  }

  mainForm() {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  get myForm(){
    return this.noteForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    let today = new Date().toLocaleDateString();
    this.noteForm.value.date = today;

    if (!this.noteForm.valid) {
      //console.log(this.userForm.value.name);
      console.log("not working!!!!!!!!");
      console.log(this.noteForm.value.title);
      console.log(this.noteForm.value.description);
  
      console.log("here");
      return false;
    } else {
      this.apiService.createNote(this.noteForm.value).subscribe(
        (res) => {
          console.log(this.noteForm.value.title);
          console.log(this.noteForm.value.description);
          console.log('Note successfully created!');
          //console.log(res);
  
          //this.ngZone.run(() => this.router.navigateByUrl('/'));
          window.open("http://localhost:4200/get-notes", "_self");
  
        }, (error) => {
          console.log(error);
        });
    }
    console.log(this.noteForm.value.description);
  }

}
