import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';

import { Subject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { User } from './user';
import { RoleService } from '../role/role.service';
import { LoginService } from '../authentication/auth-signin/login.service';
import { PermissionService } from '../permission/permission.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material';
import { DataTableDirective } from 'angular-datatables';
declare var $: any
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userList: any
  roleList: any
  permissionList: any
  dtOptions: DataTables.Settings = {};
  user: User
  userSelected: User
  roleID: any
  permissions:any
  indexUserSelected: any
  userConnected: any
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('allSelected', {static: false}) private allSelected: MatOption;
  searchUserForm: FormGroup;
  userForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private appComponent: AppComponent,
    public loginServ: LoginService,
  ) {

    this.userForm = this.fb.group({
        
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      birthday: [''],
      cin: ['', [Validators.required]],
      city: [''],
      phone: ['', [Validators.required,]],
      adresse: [''],
      password: ['', [Validators.required]],
  })
    this.userList = new Array()
    this.roleList = new Array()
    this.permissionList = new Array()
    this.user = new User()
    this.indexUserSelected = new Array()
    this.permissions = new Array()
    this.userSelected = new User()
    var obj: any = localStorage.getItem("userConnected")
    this.userConnected = JSON.parse(obj)

  }
  get f() { return this.userForm.controls; }
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
  tosslePerOne(all){ 
    if (this.allSelected.selected) {  
     this.allSelected.deselect();
     return false;
 }
   if(this.searchUserForm.controls.permissions.value.length==this.permissionList.length)
     this.allSelected.select();
 
 }
   toggleAllSelection() {
     if (this.allSelected.selected) {
       this.searchUserForm.controls.permissions
         .patchValue([...this.permissionList.map(item => item.key), 0]);
     } else {
       this.searchUserForm.controls.permissions.patchValue([]);
     }
   }
  ngOnInit(): void {
    this.searchUserForm = this.fb.group({
      permissions: new FormControl('')
    });
    if (this.loginServ.roleMatch(['SUPER_ADMIN'])) {
      this.getAllUsers()
      this.getAllRoles()
    } else {
      //this.getAllUserCreatedBy()
      this.getAllCoachByGym()
      this.getAllRolesExceptSuper()
    }


    this.getAllPermissions()
  }

  getAllPermissions() {
    this.permissionService.getAllPermissionServ().subscribe((data: any) => {
      this.permissionList = data;
    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    })
  }
  getAllRoles() {
    this.roleService.getAllRoleServ().subscribe((data: any) => {
      this.roleList = data;
    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    })
  }
  getAllRolesExceptSuper() {
    this.roleService.getAllExceptSuperServ().subscribe((data: any) => {
      this.roleList = data;
    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    })
  }

  getAllUsers() {

    this.appComponent.showLoadingSpinnerDialog()
    this.dtOptions = {
      // pagingType: 'full_numbers',
      language: this.lang,
      pageLength: 5,
      responsive: true
    };
    this.userService.getAllUserServ(this.userConnected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.userList = data;
      console.log(data);

      this.dtTrigger.next();
    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    })
  }
  getAllUserCreatedBy() {

    this.appComponent.showLoadingSpinnerDialog()
    this.dtOptions = {
      // pagingType: 'full_numbers',
      language: this.lang,
      pageLength: 5,
      responsive: true
    };
    this.userService.getAllUserCreatedByServ(this.userConnected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.userList = data;
      console.log(data);

      this.dtTrigger.next();
    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    })
  }
  addUser() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
  } 
    var id_gym:any = localStorage.getItem('gym')
    this.appComponent.showLoadingSpinnerDialog()
    this.userService.addUserServ(this.user, this.userConnected.id,id_gym)
      .subscribe((data: any) => {
        console.log(data);
        this.appComponent.hideLoadingSpinnerDialog()
        this.userList.push(data)
        this.rerender()
        $("#addUser").modal('toggle')
       this.user = new User()
       this.appComponent.toastSuccessConnection()

      },
      error => {
        this.appComponent.hideLoadingSpinnerDialog()
        this.appComponent.toastErrorConnection()
 
      })

  }

  editItemSelected(obj: User, index: number) {
    console.log(obj);
    this.userSelected = new User()
    this.indexUserSelected = index
    this.userSelected.copyUserObj(obj)
    console.log(this.userSelected)
    $("#updateUser").modal('toggle')
  }
  deleteItemSelected(obj: User, index: number) {
    this.userSelected = obj
    this.indexUserSelected = index
    $("#deleteUser").modal('toggle')
  }
  assignItemSelected(obj: User, index: number) {
    this.userSelected = obj
    this.indexUserSelected = index
    $("#assignRole").modal('toggle')
  }
  approveItemSelected(obj: User, index: number) {
    this.userSelected = obj
    this.indexUserSelected = index
    $("#approveUser").modal('toggle')
  }
  rejectItemSelected(obj: User, index: number) {
    this.userSelected = obj
    this.indexUserSelected = index
    $("#rejectUser").modal('toggle')
  }
  assignPermissionItemSelected(obj: User, index: number) {
    this.userSelected = obj
    this.indexUserSelected = index
    $("#assignPermission").modal('toggle')
  }


  updateUser() {
    console.log(this.userSelected);
    this.appComponent.showLoadingSpinnerDialog()
    this.userService.editUserServ(this.userSelected, this.userSelected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.userList[this.indexUserSelected] = data
      this.rerender()
      $("#updateUser").modal('toggle')
      this.appComponent.toastSuccessConnection()
      console.log(data)
    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    }
    );

  }
  deleteUser() {
    this.appComponent.showLoadingSpinnerDialog()
    this.userService.deleteUserServ(this.userSelected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.userList.splice(this.indexUserSelected, 1)
      this.rerender()
      $("#deleteUser").modal('toggle')
      this.appComponent.toastSuccessConnection()
    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    }
    );
  }
  lang: any = {
    "decimal": "",
    "emptyTable": "aucune donnée disponible",
    "info": "Affiche _START_ à _END_ de _TOTAL_ entrées",
    "infoEmpty": "Affiche 0 à 0 de 0 entries",
    "infoFiltered": "(filtered from _MAX_ total entrées)",
    "infoPostFix": "",
    "thousands": ",",
    "lengthMenu": "Show _MENU_ entries",
    "loadingRecords": "Loading...",
    "processing": "Processing...",
    "search": "Rechercher",
    "zeroRecords": "Aucun enregistrements correspondants trouvés",
    "paginate": {
      "first": "First",
      "last": "Last",
      "next": "Next",
      "previous": "Previous"
    },
    "aria": {
      "sortAscending": ": activate to sort column ascending",
      "sortDescending": ": activate to sort column descending"
    }
  }

  assignRoleToUser() {
    console.log(this.userSelected.id);
    console.log(this.roleID);
    this.appComponent.showLoadingSpinnerDialog()
    this.userService.assignRoleToUserServ(this.roleID, this.userSelected.id).subscribe((data: any) => {
      console.log(data);
      this.appComponent.hideLoadingSpinnerDialog()
      $("#assignRole").modal('toggle')
      this.appComponent.toastSuccessConnection()

    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    })
  }
  removeRoleToUser() {
    this.appComponent.showLoadingSpinnerDialog()
    this.userService.removeRoleToUserServ(this.roleID, this.userSelected.id).subscribe((data: any) => {
      console.log(data);
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastSuccessConnection()

    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    })
  }
  approveUser() {
    this.appComponent.showLoadingSpinnerDialog()
    this.userService.approveUserServ(this.userSelected.id).subscribe((data: any) => {
      console.log(data);
      this.appComponent.hideLoadingSpinnerDialog()
      $("#approveUser").modal('toggle')
      this.appComponent.toastSuccessConnection()

    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    })
  }
  rejectUser() {
    this.appComponent.showLoadingSpinnerDialog()
    this.userService.rejectUserServ(this.userSelected.id).subscribe((data: any) => {
      console.log(data);
      this.appComponent.hideLoadingSpinnerDialog()
      $("#rejectUser").modal('toggle')
      this.appComponent.toastSuccessConnection()

    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    })
  }
  assignPermissionToUser() {
   
    console.log(this.permissions);

    /*  var p: any = JSON.stringify(this.permissions)
    console.log(p); 

       this.userService.assignPermissionsToUserServ(this.permissions,this.userSelected.id).subscribe((data: any) => {
      console.log(data);
      $("#assignPermission").modal('toggle')
this.appComponent.toastSuccessConnection()
    },
     error => {
       this.appComponent.hideLoadingSpinnerDialog()
       this.appComponent.toastErrorConnection()

     })   */
  }
  isAllSelected: boolean = false
  checkAllCheckbox() {
    this.isAllSelected = !this.isAllSelected
    var toggleStatus = this.isAllSelected;
    console.log(this.isAllSelected + "eee");

    this.permissionList.forEach(item => {
     
      
      item.selected = toggleStatus;
    });
  };
  optionToggled() {
    console.log(this.isAllSelected);
    this.isAllSelected = !this.isAllSelected
    this.isAllSelected = this.permissionList.every(function (item) {
      
      
      return item.selected;
    });
  };
  getAllCoachByGym() {

    this.appComponent.showLoadingSpinnerDialog()
    this.dtOptions = {
      // pagingType: 'full_numbers',
      language: this.lang,
      pageLength: 5,
      responsive: true
    };
    var id_gym:any = localStorage.getItem('gym')
    this.userService.getAllCoachByGymServ(id_gym).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.userList = data;
      console.log(data);

      this.dtTrigger.next();
    },
    error => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.appComponent.toastErrorConnection()

    })
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
