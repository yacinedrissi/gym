import { Component, OnInit, ViewChild } from '@angular/core';
import { Membre } from './membres';
import { Subject } from 'rxjs';
import { LoginService } from '../authentication/auth-signin/login.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MembreService } from './membre.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
declare var $: any
@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.scss']
})
export class MembresComponent implements OnInit {

  membreList: any
  subscriptionList: any

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  membre: Membre

  membreSelected: Membre
  indexMembreSelected: any
  userConnected: any
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering

  membreForm: FormGroup;
  submitted = false;
  constructor(
    private membreService: MembreService,

    public loginServ: LoginService,
    private appComponent: AppComponent,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private formBuilder: FormBuilder,
  ) {

    this.membreForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      cin: ['', [Validators.required]],
      email: [''],
      city: [''],
      adresse: [''],
      phone: ['', [Validators.required]],
      description: [''],
      id_Subscription: ['', [Validators.required]],

    })

    this.membreList = new Array()
    this.subscriptionList = new Array()

    this.membre = new Membre()
    this.indexMembreSelected = new Array()

    this.membreSelected = new Membre()


  }

  get f() { return this.membreForm.controls; }

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
  ngOnInit(): void {
    var obj: any = localStorage.getItem("userConnected")
    this.userConnected = JSON.parse(obj)
    if (this.loginServ.roleMatch(['SUPER_ADMIN'])) {
      this.getAllMembre()
    } else {
      this.getAllMembreByOID()

      this.getAllSubscriptionByOID()
    }


  }



  getAllMembre() {
    console.log(this.userConnected.id);
    this.appComponent.showLoadingSpinnerDialog()
    this.dtOptions = {
      // pagingType: 'full_numbers',
      language: this.lang,
      pageLength: 5,
      responsive: true
    };


    this.membreService.getAllMembreServ().subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.membreList = data;
      console.log(data);

      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    },
      error => {
        this.appComponent.hideLoadingSpinnerDialog()
        this.appComponent.toastErrorConnection()

      })
  }
  getAllMembreByOID() {


    this.appComponent.showLoadingSpinnerDialog()
    this.dtOptions = {
      // pagingType: 'full_numbers',
      language: this.lang,
      pageLength: 5,
      responsive: true
    };

    var id_gym: any = localStorage.getItem('gym')
    console.log(id_gym);

    this.membreService.getAllMembreByOIDServ(id_gym).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.membreList = data;
      console.log(data);

      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    },
      error => {
        this.appComponent.hideLoadingSpinnerDialog()
        this.appComponent.toastErrorConnection()

      })
  }
  addMembre() {
    this.submitted = true;
    if (this.membreForm.invalid) {
      return;
    }
    console.log(this.membre);
    this.appComponent.showLoadingSpinnerDialog()
    var id_gym: any = localStorage.getItem('gym')
    this.membre.id_Gym = id_gym
    this.membreService.addMembreServ(this.membre)
      .subscribe((data: any) => {
        console.log(data);
        this.appComponent.hideLoadingSpinnerDialog()
        this.membreList.push(data)
        this.rerender()
        $("#addMembre").modal('toggle')
        this.membre = new Membre()
        this.appComponent.toastSuccessConnection()

      },
        error => {
          this.appComponent.hideLoadingSpinnerDialog()
          this.appComponent.toastErrorConnection()

        })

  }
  viewMember(obj: Membre) {
    var id: any = obj.id
    localStorage.setItem('member', id)
    this.router.navigateByUrl('/view-member')
  }
  /*editItemSelected(obj: Gym, index: number) {
    console.log(obj);
    this.gymSelected = new Gym()
    this.indexGymSelected = index
    this.gymSelected.copyGymObj(obj)
    console.log(this.gymSelected)
    $("#editGym").modal('toggle')
  }
   deleteItemSelected(obj: Gym, index: number) {
    this.gymSelected = obj
    this.indexGymSelected = index
    $("#deleteGym").modal('toggle')
  }
 

  updateGym() {
    this.appComponent.showLoadingSpinnerDialog()
    console.log(this.gymSelected.id);
    
    this.gymSelected.id_user = this.userConnected.id
    this.gymService.editGymServ(this.gymSelected,this.gymSelected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.gymList[this.indexGymSelected] = data
      $("#editGym").modal('toggle')

      console.log(data)
    },
      error => {
        this.appComponent.hideLoadingSpinnerDialog()
      }
    );

  }
  deleteGym() {
    this.appComponent.showLoadingSpinnerDialog()
    this.gymService.deleteGymServ(this.gymSelected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.gymList.splice(this.indexGymSelected, 1)
      $("#deleteGym").modal('toggle')
    },
      error => {
        this.appComponent.hideLoadingSpinnerDialog()
      }
    );
  } */
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

  getAllSubscriptionByOID() {
    this.appComponent.showLoadingSpinnerDialog()
    var id_gym: any = localStorage.getItem('gym')
    this.subscriptionService.getAllSubscriptionByOIDServ(id_gym).subscribe((data: any) => {
      console.log(data);
      this.appComponent.hideLoadingSpinnerDialog()
      this.subscriptionList = data
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
