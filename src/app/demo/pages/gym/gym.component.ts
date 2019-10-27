import { Component, OnInit } from '@angular/core';
import { Gym } from './gym';
import { Subject } from 'rxjs';
import { GymService } from './gym.service';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from '../authentication/auth-signin/login.service';
import { Subscription } from './subscription';
import { Router } from '@angular/router';
import { Membre } from '../membres/membres';
import { User } from '../user/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any
@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.scss']
})
export class GymComponent implements OnInit {



  gymList: any

  dtOptions: DataTables.Settings = {};
  gym: Gym
  membre: Membre

  gymSelected: Gym
  indexGymSelected: any
  subscription: Subscription
  subscriptionList: any
  subscriptionSelected: Subscription

  indexSubscriptionSelected: any
  userConnected: any
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  gymForm: FormGroup;
  submitted = false;
  constructor(
    private gymService: GymService,

    public loginServ: LoginService,
    private appComponent: AppComponent,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {

    this.gymForm = this.formBuilder.group({

      name: [''],
      discription: [''],
      address: [''],
      city: [''],
      phone: [''],
      image: [''],
    })
    this.gymList = new Array()

    this.gym = new Gym()
    this.membre = new Membre()
    this.subscription = new Subscription()
    this.subscriptionList = new Array()
    this.subscriptionSelected = new Subscription()
    this.indexSubscriptionSelected = new Array()
    this.indexGymSelected = new Array()

    this.gymSelected = new Gym()




  }
 
  get f() { return this.gymForm.controls; }
  ngOnInit(): void {
    var obj: any = localStorage.getItem("userConnected")
    this.userConnected = JSON.parse(obj)
    if (this.loginServ.roleMatch(['SUPER_ADMIN'])) {
      this.getAllGym()
    } else if (this.loginServ.roleMatch(['ADMIN'])) {
      this.getAllGymByOID()
    }
    else {
      // this.getAllGymByOID()
      this.getGymByCoach()
    }

  }



  getAllGym() {
    console.log(this.userConnected.id);
    this.appComponent.showLoadingSpinnerDialog()
    this.dtOptions = {
      // pagingType: 'full_numbers',
      language: this.lang,
      pageLength: 5,
      responsive: true
    };


    this.gymService.getAllGymServ().subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.gymList = data;
      console.log(data);

      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    },
      error => {
        this.appComponent.hideLoadingSpinnerDialog()
        this.appComponent.toastErrorConnection()

      })
  }
  getAllGymByOID() {
    console.log(this.userConnected.id);
    this.appComponent.showLoadingSpinnerDialog()
    this.dtOptions = {
      // pagingType: 'full_numbers',
      language: this.lang,
      pageLength: 5,
      responsive: true
    };


    this.gymService.getAllGymByOIDServ(this.userConnected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.gymList = data;
      console.log(data);

      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    },
      error => {
        this.appComponent.hideLoadingSpinnerDialog()
        this.appComponent.toastErrorConnection() 

      })
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.gymForm.get('image').setValue(file);
    }
  }
  addGym() {

    const formData = new FormData();
    formData.append('image', this.gymForm.get('image').value);
    formData.append('name', this.gymForm.get('name').value);
    formData.append('city', this.gymForm.get('city').value);
    formData.append('discription', this.gymForm.get('discription').value);
    formData.append('address', this.gymForm.get('address').value);
    formData.append('phone', this.gymForm.get('phone').value);


    this.submitted = true;
    if (this.gymForm.invalid) {
      return;
    }
    this.appComponent.showLoadingSpinnerDialog()
    /* this.gym.id_user = this.userConnected.id
    this.gym.image = formData.get('image').valueOf()
    console.log(this.gym); */
    this.gymService.addGymServ(this.gymForm.value)
      .subscribe((data: any) => {
        console.log("response=======================>");

        console.log(data);
        this.appComponent.hideLoadingSpinnerDialog()
        this.gymList.push(data)
        $("#addGym").modal('toggle')
        this.gym = new Gym()
        this.appComponent.toastSuccessConnection()

      },
        error => {
          this.appComponent.hideLoadingSpinnerDialog()
          this.appComponent.toastErrorConnection()

        })

  }

  editItemSelected(obj: any) {
    if (this.loginServ.roleMatch(['ADMIN'])) {
      console.log(obj);
      var gym: any = obj.id
      var gymObj: any = JSON.stringify(obj)
      localStorage.setItem('gym', gym)
      localStorage.setItem('gymObj', gymObj)
      this.router.navigateByUrl('/detail')
    } else {
      console.log(obj);
      var gym: any = obj.id_gym
      var gymObj: any = JSON.stringify(obj)
      localStorage.setItem('gym', gym)
      localStorage.setItem('gymObj', gymObj)
      this.router.navigateByUrl('/detail')
    }

    /*  this.gymSelected = new Gym()
     this.indexGymSelected = index
     this.gymSelected.copyGymObj(obj)
     console.log(this.gymSelected)
     $("#editGym").modal('toggle') */
  }
  deleteItemSelected(obj: Gym, index: number) {
    this.gymSelected = obj
    this.indexGymSelected = index
    $("#deleteGym").modal('toggle')
  }
  goSub(obj: Gym) {
    var id: any = obj.id
    localStorage.setItem('gym', id)
    this.router.navigateByUrl('/subscription')
  }
  goMembre(obj: Membre) {
    var id: any = obj.id
    localStorage.setItem('gym', id)
    this.router.navigateByUrl('/membres')
  }
  goCoatch(obj: User) {
    var id: any = obj.id
    localStorage.setItem('gym', id)
    this.router.navigateByUrl('/user')
  }


  updateGym() {
    this.appComponent.showLoadingSpinnerDialog()
    console.log(this.gymSelected.id);

    this.gymSelected.id_user = this.userConnected.id
    this.gymService.editGymServ(this.gymSelected, this.gymSelected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.gymList[this.indexGymSelected] = data
      $("#editGym").modal('toggle')
      this.appComponent.toastSuccessConnection()
      console.log(data)
    },
      error => {
        this.appComponent.hideLoadingSpinnerDialog()
        this.appComponent.toastErrorConnection()

      }
    );

  }
  deleteGym() {
    this.appComponent.showLoadingSpinnerDialog()
    this.gymService.deleteGymServ(this.gymSelected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.gymList.splice(this.indexGymSelected, 1)
      $("#deleteGym").modal('toggle')
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
  ///********CRUD Subscription***** */
  public imagePath;
  public image;
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
    this.image = files[0];
    console.log(this.image);
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

  }

  ///********End Subscription***** */

  getGymByCoach() {
    console.log(this.userConnected.id);
    this.appComponent.showLoadingSpinnerDialog()
    this.dtOptions = {
      // pagingType: 'full_numbers',
      language: this.lang,
      pageLength: 5,
      responsive: true
    };


    this.gymService.getGymByCoachServ(this.userConnected.id).subscribe((data: any) => {
      this.appComponent.hideLoadingSpinnerDialog()
      this.gymList = data;
      console.log(data);

    },
      error => {
        this.appComponent.hideLoadingSpinnerDialog()
        this.appComponent.toastErrorConnection()

      })
  }
}
