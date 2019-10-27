import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/pages/test.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
list:any = new Array()
  constructor(
    private test:TestService
  ) { }

  ngOnInit() {
    //this.getAllPermissions()
  }
  getAllPermissions(){

    this.test.getAllPermissionsService().subscribe((data:any) =>{
        
        this.list = data
        console.log(this.list)
    })
  }
}
