import { Injectable } from '@angular/core';
import { Config } from 'src/support/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  config:Config = new Config();
  API_URL = "https://" + this.config.host;
  constructor(
    private http : HttpClient
  ) { }

  getAllRoleServ(){
    return this.http.get(this.API_URL+"/roles")
  }
  getAllExceptSuperServ(){
    return this.http.get(this.API_URL+"/rolesExceptSuper")
  }

  editRoleServ(role:any,id:any){
    return this.http.put(this.API_URL+"/updateRole/"+id,role);
  }
  addRoleServ(role:any){
    return this.http.post(this.API_URL+"/createrole",role);
  }


  deleteRoleServ(roleID:any){
    return this.http.delete(this.API_URL+"/deleterole/"+roleID)
  }
}
