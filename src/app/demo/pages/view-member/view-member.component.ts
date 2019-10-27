import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MembreService } from '../membres/membre.service';
import { AppComponent } from 'src/app/app.component';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.scss']
})
export class ViewMemberComponent implements OnInit {

  historyPayementList:any
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(

    private membreService:MembreService,
    private appComponent:AppComponent,
  ) {

    this.historyPayementList = new Array()
   }

 
  ngOnInit() {
    this.getAllPayment_historyBymember()
  }
  

 
  /* ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  @ViewChild(DataTableDirective,{static:false})
  dtElement: DataTableDirective;
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  } */

  /* ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.dtTrigger.unsubscribe();
  } */

  getAllPayment_historyBymember(){
    console.log("goooooooooooooooooood");
    
    this.appComponent.showLoadingSpinnerDialog()
    this.dtOptions = {
      // pagingType: 'full_numbers',
     language : this.lang,
       pageLength: 5,
       responsive :true
     };
     var id_member:any = localStorage.getItem('member')
     
     this.membreService.getAllPayment_historyBymemberServ(id_member).subscribe((data:any)=>{
       this.appComponent.hideLoadingSpinnerDialog()
       this.historyPayementList = data;
       console.log(data);
       
       // Calling the DT trigger to manually render the table
       this.dtTrigger.next();
      
     },
     error => {
       this.appComponent.hideLoadingSpinnerDialog()
       this.appComponent.toastErrorConnection()

     })
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
