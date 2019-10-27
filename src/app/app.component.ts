import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  loadingSpinnerDialog: boolean = true
  isLoggedIn: boolean = false

    constructor(
      private router: Router,
      private toastrService :ToastrService 
      
      ) {
     
    }

    toastErrorConnection(){
     this.toastrService.error('Eroor','You are not connected check the internet please :)')
   }
    toastSuccessConnection(){
     this.toastrService.success('','The operation was successful :)')
   }

  ngOnInit() {
   
    this.hideLoadingSpinnerDialog()
    this.setIsloggedInValue(false)
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  setIsloggedInValue(val: boolean) {
    this.isLoggedIn = val;
  }
  showLoadingSpinnerDialog() {
    $("#loadingSpinnerDialog").show();
  }
  hideLoadingSpinnerDialog() {
    $("#loadingSpinnerDialog").hide();
  }
 /*  roleMatch(allowedRoles):boolean{
    console.log(allowedRoles);
    
   var isMatch = false
   var userRoles : any = JSON.parse(localStorage.getItem('Roles'))
   console.log(userRoles);
   
   allowedRoles.forEach(element => {
    console.log("====>"+element);
    
     
     if (userRoles.indexOf(element) > -1) {
       isMatch =true
       return false;
     }
   });
   return isMatch;
 } */

 
}
