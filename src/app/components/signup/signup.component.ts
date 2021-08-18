import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormArray, FormControl } from '@angular/forms';
import { ApiService } from './../../service/api.service';
import { Router } from '@angular/router';
declare const showAlert:any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  submitted = false;
  userForm: FormGroup;
  check:any;

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
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      availability: ['Available', [Validators.required]],
    })
  }

  get myForm(){
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      //console.log(this.userForm.value.name);
      console.log("not working!!!!!!!!");
      console.log(this.userForm.value.username);
      console.log(this.userForm.value.displayName);
      console.log(this.userForm.value.email);
      console.log(this.userForm.value.password);
      console.log(this.userForm.value.availability);
  
      console.log("here");
      return false;
    } else {
      this.apiService.createUser(this.userForm.value).subscribe(
        (res) => {
          console.log(this.userForm.value.username);
          console.log(this.userForm.value.displayName);
          console.log(this.userForm.value.email);
          console.log(this.userForm.value.password);
          console.log(this.userForm.value.availability);
          console.log('User successfully created!');
          //console.log(res);
          //showAlert( this.userForm.value.displayName+ " is Registered ");
  
          //this.ngZone.run(() => this.router.navigateByUrl('/'));
  
        }, (error) => {
          console.log(error);
        });
    }
  }

}
