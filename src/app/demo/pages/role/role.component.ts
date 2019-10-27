import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from './role.service';
import { Role } from './role';
import { Subject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { DataTableDirective } from 'angular-datatables';
declare var $: any
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  roleList: any
  dtOptions: DataTables.Settings = {};
  role:Role
  roleSelected:Role 
  indexRoleSelected:any 
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private roleService: RoleService,
    private appComponent:AppComponent
    ) { 

      this.roleList = new Array()
      this.role = new Role()
      this.indexRoleSelected =  new Array()
      this.roleSelected = new Role()

    }

  ngOnInit(): void {
    this.getAllRoles()
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
  getAllRoles() {
    this.appComponent.showLoadingSpinnerDialog()
    this.dtOptions = {
      // pagingType: 'full_numbers',
     language : this.lang,
       pageLength: 5,
       responsive :true
     };
     this.roleService.getAllRoleServ().subscribe((data:any)=>{
       this.appComponent.hideLoadingSpinnerDialog()
       this.roleList = data;
       // Calling the DT trigger to manually render the table
       this.dtTrigger.next();
     },
     error => {
       this.appComponent.hideLoadingSpinnerDialog()
       this.appComponent.toastErrorConnection()

     })
  }
 
  addRole(){
    console.log(this.role);
    this.appComponent.showLoadingSpinnerDialog()
   this.roleService.addRoleServ(this.role)
   .subscribe((data:any)=>{
     console.log(data);
     this.appComponent.hideLoadingSpinnerDialog()
       this.roleList.push(data)
       this.rerender()
       $("#addRole").modal('toggle')
       this.role = new Role()
       this.appComponent.toastSuccessConnection()
       
   },
   error => {
     this.appComponent.hideLoadingSpinnerDialog()
     this.appComponent.toastErrorConnection()

   })

  }

  editItemSelected(obj: Role, index: number) {
    console.log(obj);
    this.roleSelected = new Role()
    this.indexRoleSelected = index
    this.roleSelected.copyRoleObj(obj)
    console.log(this.roleSelected)
    $("#editRole").modal('toggle')
  }
   deleteItemSelected(obj: Role, index: number) {
    this.roleSelected = obj
    this.indexRoleSelected = index
    $("#deleteRole").modal('toggle')
  } 
 

  updateRole() {
    this.appComponent.showLoadingSpinnerDialog()
    this.roleService.editRoleServ(this.roleSelected,this.roleSelected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.roleList[this.indexRoleSelected] = data
      this.rerender()
      $("#editRole").modal('toggle')
      this.appComponent.toastSuccessConnection()

      console.log(data)
    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    }
    );

  }
  deleteRole() {
    this.appComponent.showLoadingSpinnerDialog()
    this.roleService.deleteRoleServ(this.roleSelected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.roleList.splice(this.indexRoleSelected, 1)
      this.rerender()
      $("#deleteRole").modal('toggle')
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
