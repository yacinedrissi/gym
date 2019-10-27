import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from './user';
import { AppComponent } from 'src/app/app.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  
  user: User
  error: any = 0;
  show: boolean;
  icon:boolean 
  private roles: Array<any> = []
  private permissions: Array<any> = []
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginServ: LoginService,
    private appComponent: AppComponent,
  ) {
    this.show = false;
    this.icon = false
    this.user = new User()
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      //confirmPassword: ['', Validators.required]
  }, {
     // validator: this.MustMatch('password', 'confirmPassword')
  });
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }
    this.appComponent.showLoadingSpinnerDialog()
    this.loginServ.loginServ(this.user).subscribe((data: any) => {
      console.log(this.user);
      this.appComponent.hideLoadingSpinnerDialog()
      this.roles = data.user.roles
      this.permissions = data.user.permissions
      var userConnected = JSON.stringify(data.user)
      var r = JSON.stringify(this.roles)
      var p = JSON.stringify(this.permissions)
      localStorage.setItem("token", data[0].token)
      localStorage.setItem("userConnected", userConnected)
      localStorage.setItem("Roles", r)
      localStorage.setItem("Permissions", p)
      window.location.href = '/dashboard/default'

    },
      error => {
        this.appComponent.hideLoadingSpinnerDialog()
        this.error = 1
      }) 
  
}
  togglePassword() {
    if(this.show == false){
      this.show = true
      this.icon = true
    }
    else{
      this.show = false
      this.icon = false
    }
  }
  ngOnInit() {

  }

  logIn() {
    this.appComponent.showLoadingSpinnerDialog()
    this.loginServ.loginServ(this.user).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.roles = data.user.roles
      this.permissions = data.user.permissions
      var userConnected = JSON.stringify(data.user)
      var r = JSON.stringify(this.roles)
      var p = JSON.stringify(this.permissions)
      localStorage.setItem("token", data[0].token)
      localStorage.setItem("userConnected", userConnected)
      localStorage.setItem("Roles", r)
      localStorage.setItem("Permissions", p)
      window.location.href = '/dashboard/default'

    },
      error => {
        this.appComponent.hideLoadingSpinnerDialog()
        this.error = 1
      })
  }



}
