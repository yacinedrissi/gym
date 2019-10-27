import { Component, OnInit } from '@angular/core';
import { Gym } from '../gym/gym';
import { AppComponent } from 'src/app/app.component';
import { GymService } from '../gym/gym.service';
import { LoginService } from '../authentication/auth-signin/login.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  gym:any
  constructor(
    private appComponent:AppComponent,
    private gymService:GymService,
    public loginServ:LoginService,
  ) {
   var gymObj:any = JSON.parse(localStorage.getItem('gymObj'))
     this.gym = gymObj
   }

  ngOnInit() {
  }


  updateGym() {
    this.appComponent.showLoadingSpinnerDialog()
    console.log(this.gym);
    this.gymService.editGymServ(this.gym,this.gym.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastSuccessConnection()
      console.log(data)
    },
      error => {
        this.appComponent.hideLoadingSpinnerDialog()
      }
    );

  }
  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

}
