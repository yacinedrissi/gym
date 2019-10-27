import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from './register';
import { RegisterService } from './register.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {
  user: Register
  error:any = 0;
  show: boolean;
  icon:boolean 
  constructor(
    private router: Router,
    private registerService: RegisterService,
    private appComponent: AppComponent,

  ) {

    this.user = new Register()
    this.show = false;
    this.icon = false
  }

  ngOnInit() {
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
  register() {
this.appComponent.showLoadingSpinnerDialog()
    console.log(this.user)
    this.registerService.registerServ(this.user).subscribe((data: any) => {
      
      if (data.email) {
        this.appComponent.hideLoadingSpinnerDialog()
        this.error = 1
      } else {
        this.appComponent.hideLoadingSpinnerDialog()
        this.router.navigateByUrl('/auth/signin')
      }
     

    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    })
  }

}
