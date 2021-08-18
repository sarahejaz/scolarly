import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateNoteComponent } from './components/note/create-note/create-note.component';
import { DeleteNoteComponent } from './components/note/delete-note/delete-note.component';
import { EditNoteComponent } from './components/note/edit-note/edit-note.component';
import { HomeComponent } from './components/home/home.component';
import { ListNotesComponent } from './components/note/list-notes/list-notes.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewNoteComponent } from './components/note/view-note/view-note.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SafeHtmlPipePipe } from './safe-html-pipe.pipe';

import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { CreateAssignmentComponent } from './components/assignment/create-assignment/create-assignment.component';
import { DeleteAssignmentComponent } from './components/assignment/delete-assignment/delete-assignment.component';
import { EditAssignmentComponent } from './components/assignment/edit-assignment/edit-assignment.component';
import { ListAssignmentsComponent } from './components/assignment/list-assignments/list-assignments.component';
import { ViewAssignmentComponent } from './components/assignment/view-assignment/view-assignment.component';
import { ListTimetablesComponent } from './components/timetable/list-timetables/list-timetables.component';
import { AddTimetableComponent } from './components/timetable/add-timetable/add-timetable.component';
import { DeleteTimetableComponent } from './components/timetable/delete-timetable/delete-timetable.component';
import { EditTimetableComponent } from './components/timetable/edit-timetable/edit-timetable.component';
import { ViewTimetableComponent } from './components/timetable/view-timetable/view-timetable.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HelpComponent } from './components/help/help.component';
import { CreateReminderComponent } from './components/reminder/create-reminder/create-reminder.component';
import { DeleteReminderComponent } from './components/reminder/delete-reminder/delete-reminder.component';
import { EditReminderComponent } from './components/reminder/edit-reminder/edit-reminder.component';
import { ListRemindersComponent } from './components/reminder/list-reminders/list-reminders.component';
import { ViewReminderComponent } from './components/reminder/view-reminder/view-reminder.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateNoteComponent,
    DeleteNoteComponent,
    EditNoteComponent,
    HomeComponent,
    ListNotesComponent,
    LoginComponent,
    SignupComponent,
    ViewNoteComponent,
    SafeHtmlPipePipe,
    CreateAssignmentComponent,
    DeleteAssignmentComponent,
    EditAssignmentComponent,
    ListAssignmentsComponent,
    ViewAssignmentComponent,
    ListTimetablesComponent,
    AddTimetableComponent,
    DeleteTimetableComponent,
    EditTimetableComponent,
    ViewTimetableComponent,
    HelpComponent,
    CreateReminderComponent,
    DeleteReminderComponent,
    EditReminderComponent,
    ListRemindersComponent,
    ViewReminderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RichTextEditorAllModule,
    RouterModule,
    PdfViewerModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
