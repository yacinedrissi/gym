import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PermissionService } from './permission.service';
import { Permission } from './permission';
import { AppComponent } from 'src/app/app.component';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';
import { FormControl } from '@angular/forms';
declare var $: any
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  dtOptions: DataTables.Settings = {};
  permissionList: any
  permission:Permission
  permissionSelected:Permission 
  indexPermissionSelected:any 
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private permissionService: PermissionService,
    private appComponent:AppComponent
    ) { 

      this.permissionList = new Array()
      this.permission = new Permission()
      this.indexPermissionSelected =  new Array()
      this.permissionSelected = new Permission()

    }

  ngOnInit(): void {
    this.getAllPermissions()
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

  getAllPermissions() {
    this.appComponent.showLoadingSpinnerDialog()
    this.dtOptions = {
      // pagingType: 'full_numbers',
     language : this.lang,
       pageLength: 5,
       responsive :true
     };
     this.permissionService.getAllPermissionServ().subscribe((data:any)=>{
       this.appComponent.hideLoadingSpinnerDialog()
       this.permissionList = data;
       // Calling the DT trigger to manually render the table
       this.dtTrigger.next();
     },
     error => {
       this.appComponent.hideLoadingSpinnerDialog()
       this.appComponent.toastErrorConnection()

     })
  }
  addPermission(){
    console.log(this.permission);
    this.appComponent.showLoadingSpinnerDialog()
   this.permissionService.addPermissionServ(this.permission)
   .subscribe((data:any)=>{
     console.log(data);
     this.appComponent.hideLoadingSpinnerDialog()
       this.permissionList.push(data)
       this.rerender()
       $("#addPermission").modal('toggle')
       this.permission = new Permission()
       this.appComponent.toastSuccessConnection()
   },
   error => {
     this.appComponent.hideLoadingSpinnerDialog()
     this.appComponent.toastErrorConnection()

   })

  }

  editItemSelected(obj: Permission, index: number) {
    console.log(obj);
    this.permissionSelected = new Permission()
    this.indexPermissionSelected = index
    this.permissionSelected.copyPermissionObj(obj)
    console.log(this.permissionSelected)
    $("#editPermission").modal('toggle')
  }
   deleteItemSelected(obj: Permission, index: number) {
    this.permissionSelected = obj
    this.indexPermissionSelected = index
    $("#deletePermission").modal('toggle')
  } 
 

  updatePermission() {
    this.appComponent.showLoadingSpinnerDialog()
    this.permissionService.editPermissionServ(this.permissionSelected,this.permissionSelected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.permissionList[this.indexPermissionSelected] = data
      this.rerender()
      $("#editPermission").modal('toggle')
      this.appComponent.toastSuccessConnection()
      console.log(data)
    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    }
    );

  }
  deletePermission() {
    this.appComponent.showLoadingSpinnerDialog()
    this.permissionService.deletePermissionServ(this.permissionSelected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.permissionList.splice(this.indexPermissionSelected, 1)
      this.rerender()
      $("#deletePermission").modal('toggle')
      this.appComponent.toastSuccessConnection()
    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    }
    );
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
