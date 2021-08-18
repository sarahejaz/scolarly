import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNoteComponent } from './components/note/create-note/create-note.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListNotesComponent } from './components/note/list-notes/list-notes.component';
import { SignupComponent } from './components/signup/signup.component';
//import { UserComponent } from './components/user/user.component';
import { ViewNoteComponent } from './components/note/view-note/view-note.component';
import { EditNoteComponent } from './components/note/edit-note/edit-note.component';
import { DeleteNoteComponent } from './components/note/delete-note/delete-note.component';
import { ListAssignmentsComponent } from './components/assignment/list-assignments/list-assignments.component';
import { CreateAssignmentComponent } from './components/assignment/create-assignment/create-assignment.component';
import { ViewAssignmentComponent } from './components/assignment/view-assignment/view-assignment.component';
import { EditAssignmentComponent } from './components/assignment/edit-assignment/edit-assignment.component';
import { DeleteAssignmentComponent } from './components/assignment/delete-assignment/delete-assignment.component';
import { AddTimetableComponent } from './components/timetable/add-timetable/add-timetable.component';
import { ListTimetablesComponent } from './components/timetable/list-timetables/list-timetables.component';
import { ViewTimetableComponent } from './components/timetable/view-timetable/view-timetable.component';
import { EditTimetableComponent } from './components/timetable/edit-timetable/edit-timetable.component';
import { DeleteTimetableComponent } from './components/timetable/delete-timetable/delete-timetable.component';
import { HelpComponent } from './components/help/help.component';
import { CreateReminderComponent } from './components/reminder/create-reminder/create-reminder.component';
import { ListRemindersComponent } from './components/reminder/list-reminders/list-reminders.component';
import { ViewReminderComponent } from './components/reminder/view-reminder/view-reminder.component';
import { EditReminderComponent } from './components/reminder/edit-reminder/edit-reminder.component';
import { DeleteReminderComponent } from './components/reminder/delete-reminder/delete-reminder.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  /*{
    path: 'user',
    component: UserComponent
  },*/
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },

  // ================================================ NOTES ================================================
  {
    path: 'create-note',
    component: CreateNoteComponent
  },
  /*{
    path: 'userNotes/:username',
    component: ListNotesComponent
  },*/
  {
    path: 'get-notes',
    component: ListNotesComponent
  },
  {
    path: 'view-note/:id',
    component: ViewNoteComponent
  },
  {
    path: 'edit-note/:id',
    component: EditNoteComponent
  },
  {
    path: 'delete-note/:id',
    component: DeleteNoteComponent
  },
// ================================================ ASSIGNMENTS ================================================
  {
    path: 'create-assignment',
    component: CreateAssignmentComponent
  },
  {
    path: 'get-assignments',
    component: ListAssignmentsComponent
  },
  {
    path: 'view-assignment/:id',
    component: ViewAssignmentComponent
  },
  {
    path: 'edit-assignment/:id',
    component: EditAssignmentComponent
  },
  {
    path: 'delete-assignment/:id',
    component: DeleteAssignmentComponent
  },
// ================================================ TIME TABLE ================================================
  {
    path: 'add-timetable',
    component: AddTimetableComponent
  },
  {
    path: 'get-timetables',
    component: ListTimetablesComponent
  },
  {
    path: 'view-timetable/:id',
    component: ViewTimetableComponent
  },
  {
    path: 'edit-timetable/:id',
    component: EditTimetableComponent
  },
  {
    path: 'delete-timetable/:id',
    component: DeleteTimetableComponent
  },
  // ================================================ REMINDER ================================================
  {
    path: 'create-reminder',
    component: CreateReminderComponent
  },
  {
    path: 'get-reminders',
    component: ListRemindersComponent
  },
  {
    path: 'view-reminder/:id',
    component: ViewReminderComponent
  },
  {
    path: 'edit-reminder/:id',
    component: EditReminderComponent
  },
  {
    path: 'delete-reminder/:id',
    component: DeleteReminderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
