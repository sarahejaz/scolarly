import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUri:string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  authToken;

  constructor(private http: HttpClient) { }

    // Error handling 
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }

  createUser(data): Observable<any> {
    console.log(data);
    let url = `${this.baseUri}/signup`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  
  login(body:any){
    return this.http.post(this.baseUri+'/login',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  // ================================================ NOTES ================================================
  getNotes() {
    return this.http.get(`${this.baseUri}/getNotes`);
  }

  createNote(data): Observable<any> {
    console.log(data);
    let url = `${this.baseUri}/createNote`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getNote(id): Observable<any> {
    let url = `${this.baseUri}/readNote/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateNote(id, data): Observable<any> {
    let url = `${this.baseUri}/updateNote/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  deleteNote(id): Observable<any> {
    let url = `${this.baseUri}/deleteNote/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // ================================================ ASSIGNMENTS ================================================

  getAssignments() {
    return this.http.get(`${this.baseUri}/getAssignments`);
  }

  createAssignment(data): Observable<any> {
    console.log(data);
    let url = `${this.baseUri}/createAssignment`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getAssignment(id): Observable<any> {
    let url = `${this.baseUri}/readAssignment/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateAssignment(id, data): Observable<any> {
    let url = `${this.baseUri}/updateAssignment/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  deleteAssignment(id): Observable<any> {
    let url = `${this.baseUri}/deleteAssignment/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // ================================================ TIMETABLES ================================================

  addTimetable(data): Observable<any> {
    console.log(data);
    let url = `${this.baseUri}/uploadTimetable`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getTimetables() {
    return this.http.get(`${this.baseUri}/getTimetables`);
  }

  deleteTimetable(id): Observable<any> {
    console.log("from api service ", id);
    let url = `${this.baseUri}/deleteTimetable/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // ================================================ REMINDERS ================================================

  getReminders() {
    return this.http.get(`${this.baseUri}/getReminders`);
  }

  createReminder(data): Observable<any> {
    console.log(data);
    let url = `${this.baseUri}/createReminder`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getReminder(id): Observable<any> {
    let url = `${this.baseUri}/readReminder/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateReminder(id, data): Observable<any> {
    let url = `${this.baseUri}/updateReminder/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  deleteReminder(id): Observable<any> {
    let url = `${this.baseUri}/deleteReminder/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }


}
