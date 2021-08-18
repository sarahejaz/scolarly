import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from 'src/app/service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Note } from 'src/app/model/note';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  id: any;

  
  @ViewChild('fromRTE')
  private rteEle: RichTextEditorComponent;
  public value: string = null;
    rteCreated(): void {
      this.rteEle.element.focus();
  }


  constructor(public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.updateNote();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.id = id;
    this.getNote(id);
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  updateNote() {
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  getNote(id) {
    this.apiService.getNote(id).subscribe(data => {
      this.editForm.setValue({
        title: data['title'],
        description: data['description']
      });
    });
  }

  get myForm() {
    return this.editForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateNote(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/get-notes');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      
    }
  }

  getViewNoteURL() {
    return "http://localhost:4200/view-note/"+this.id;
  }

}
