import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SubscriptionService } from './subscription.service';
import { GymService } from '../gym/gym.service';
import { Subscription } from '../gym/subscription';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from '../authentication/auth-signin/login.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
declare var $: any
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  subscription:Subscription
  subscriptionList: any
  subscriptionSelected:Subscription 
   
  indexSubscriptionSelected:any 
  userConnected:any
  constructor(
    private gymService:GymService,
    private subscriptionService: SubscriptionService,
    private appComponent: AppComponent,
    public loginServ: LoginService,
    public router: Router,
  ) { 

    this.subscription = new Subscription()
    this.subscriptionList = new Array()
    this.subscriptionSelected = new Subscription()
    this.indexSubscriptionSelected =  new Array()
  }
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  ngOnInit() {
    if (!localStorage.getItem('gym')) {
      this.router.navigateByUrl('/gym')
    }
    else{
      if (this.loginServ.roleMatch(['SUPER_ADMIN'])) {
        
        this.getAllSubscription()
       } else {
       
        
         this.getAllSubscriptionByOID()
       }
     
    }

  
  }

  editSubscription(){
  console.log(this.subscriptionSelected);
  
    this.appComponent.showLoadingSpinnerDialog()
     
     this.subscriptionService.editSubscriptionServ(this.subscriptionSelected.id,this.subscriptionSelected)
    .subscribe((data:any)=>{
      this.appComponent.hideLoadingSpinnerDialog()
      this.subscriptionList[this.indexSubscriptionSelected] = data
      this.rerender()
        $("#editSubscription").modal('toggle')
        this.appComponent.toastSuccessConnection()
        
    }) 
 }
  addSubscription(){
  
    this.appComponent.showLoadingSpinnerDialog()
    var id_gym:any = localStorage.getItem('gym')
     this.subscription.id_gym = id_gym
     console.log(this.subscription);
     
     this.subscriptionService.addSubscriptionServ(this.subscription)
    .subscribe((data:any)=>{
      this.appComponent.hideLoadingSpinnerDialog()
        this.subscriptionList.push(data)
        this.rerender()
        $("#addSubscription").modal('toggle')
        this.subscription = new Subscription()
        this.appComponent.toastSuccessConnection()
        
    }) 
 }
 deleteSubscription() {
  this.appComponent.showLoadingSpinnerDialog()
  console.log(this.subscriptionSelected.id);
  
  this.subscriptionService.deleteSubscriptionServ(this.subscriptionSelected.id).subscribe((data: any) => {
    this.appComponent.hideLoadingSpinnerDialog()
    this.subscriptionList.splice(this.indexSubscriptionSelected, 1)
    this.rerender()
    $("#deleteSubscription").modal('toggle')
    this.appComponent.toastSuccessConnection()
  },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
    }
  );
}
 getAllSubscriptionByOID(){
  this.appComponent.showLoadingSpinnerDialog()
  this.dtOptions = {
    // pagingType: 'full_numbers',
   language : this.lang,
     pageLength: 5,
     responsive :true
   };
  
  
   var id_gym:any = localStorage.getItem('gym')
   this.subscriptionService.getAllSubscriptionByOIDServ(id_gym).subscribe((data:any)=>{
 console.log(data);
 this.appComponent.hideLoadingSpinnerDialog()
     this.subscriptionList = data
     this.dtTrigger.next();
   },
   error => {
     this.appComponent.hideLoadingSpinnerDialog()
     this.appComponent.toastErrorConnection()

   })
 }
 getAllSubscription(){
  this.appComponent.showLoadingSpinnerDialog()
  this.dtOptions = {
    // pagingType: 'full_numbers',
   language : this.lang,
     pageLength: 5,
     responsive :true
   };
  
  this.gymService.getAllSubscriptionServ().subscribe((data:any)=>{
console.log(data);
this.appComponent.hideLoadingSpinnerDialog()
    this.subscriptionList = data
    this.dtTrigger.next();
  },
  error => {
    this.appComponent.hideLoadingSpinnerDialog()
    this.appComponent.toastErrorConnection()

  })
}

 editItemSelected(obj: Subscription, index: number) {
  console.log(obj);
  this.subscriptionSelected = new Subscription()
  this.indexSubscriptionSelected = index
  this.subscriptionSelected.copySubscriptionObj(obj)
  $("#editSubscription").modal('toggle')
}
deleteItemSelected(obj: Subscription, index: number) {
  this.subscriptionSelected = obj
  this.indexSubscriptionSelected = index
  $("#deleteSubscription").modal('toggle')
}
lang:any = {
  "decimal":        "",
  "emptyTable":     "aucune donnée disponible",
  "info":           "Affiche _START_ à _END_ de _TOTAL_ entrées",
  "infoEmpty":      "Affiche 0 à 0 de 0 entries",
  "infoFiltered":   "(filtered from _MAX_ total entrées)",
  "infoPostFix":    "",
  "thousands":      ",",
  "lengthMenu":     "Show _MENU_ entries",
  "loadingRecords": "Loading...",
  "processing":     "Processing...",
  "search":         "Rechercher",
  "zeroRecords":    "Aucun enregistrements correspondants trouvés",
  "paginate": {
      "first":      "First",
      "last":       "Last",
      "next":       "Next",
      "previous":   "Previous"
  },
  "aria": {
      "sortAscending":  ": activate to sort column ascending",
      "sortDescending": ": activate to sort column descending"
  }
}
}
