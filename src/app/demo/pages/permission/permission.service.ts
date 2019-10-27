import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/support/config';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  config:Config = new Config();
  API_URL = "https://" + this.config.host;
  constructor(
    private http : HttpClient
  ) { }


  getAllPermissionServ(){

    return this.http.get(this.API_URL+"/permissions");
  }

  editPermissionServ(permission:any,id:any){
    return this.http.put(this.API_URL+"/updatePermission/"+id,permission);
  }
  addPermissionServ(permission:any){
    return this.http.post(this.API_URL+"/createPermission",permission);
  }


  deletePermissionServ(permissionID:any){
    return this.http.delete(this.API_URL+"/deletePermission/"+permissionID)
  }
}
