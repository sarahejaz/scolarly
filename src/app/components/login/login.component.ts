import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormArray, FormControl } from '@angular/forms';
import { ApiService } from './../../service/api.service';
import { Router } from '@angular/router';
declare const showAlert:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  serverErrorMessages: string;
  submitted = false;
  form: FormGroup;
  constructor(public fb: FormBuilder,private router: Router,private apiService: ApiService) {
    this.mainForm();

  }

  mainForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
    })
  }

  login(){
    if(!this.form.valid){
      console.log('Invalid');return;
    }

    // console.log(JSON.stringify(this.loginForm.value));
    this.apiService.login(JSON.stringify(this.form.value))
    .subscribe(
      data=>{
        console.log("success");
        console.log(data);    
    this.router.navigate(['/home'],{ queryParams: { profile: JSON.stringify(data) }});} ,
      error=>{console.error(error);
        this.serverErrorMessages="Email or Password is invalid";}
    )
  }

  ngOnInit(): void {
  }

}
