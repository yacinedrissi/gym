import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from '../authentication/auth-signin/login.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userConnected: User


  constructor(
    public appComponent: AppComponent,
    public loginServ: LoginService,
    public userService: UserService,
  ) {
  this.userConnected =  new User()
  }

  ngOnInit() {
    var obj: any = localStorage.getItem("userConnected")
    this.userConnected = JSON.parse(obj)
    console.log(this.userConnected);

    // this.loginServ.roleMatch(['SUPER_ADMIN'])

  }
  updateProfile() {
    console.log(this.userConnected);
    this.appComponent.showLoadingSpinnerDialog()
    this.userConnected.statut = "active"
    this.userService.editUserServ(this.userConnected, this.userConnected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      var userConnected = JSON.stringify(data)
      localStorage.setItem('userConnected', userConnected)
      this.appComponent.toastSuccessConnection()
      console.log(data)
    },
      error => {
        this.appComponent.hideLoadingSpinnerDialog()
        this.appComponent.toastErrorConnection()
      }
    );

  }

}
