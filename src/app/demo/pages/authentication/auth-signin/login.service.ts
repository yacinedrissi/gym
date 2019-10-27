import { Injectable } from '@angular/core';
import { Config } from 'src/support/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  config: Config = new Config();
  API_URL = "https://" + this.config.host;
   userRoles: any 
   userPermissions: any 
  constructor(
    private http: HttpClient
  ) {

    this.userRoles =  new Array()
    this.userPermissions =  new Array()
    
   }

  loginServ(user: any) {
console.log(user);

    return this.http.post(this.API_URL + "/user/login", user);
  }

  permissionMatch(allowedPermissions: any): boolean {
    var isMatch = false
    var listPermissions:any = new Array()
     this.userPermissions = JSON.parse(localStorage.getItem('Permissions'))
    if (this.userPermissions !=null) {
      for (let i = 0; i < this.userPermissions.length; i++) {
        listPermissions.push(this.userPermissions[i].name)
        
      }
      allowedPermissions.forEach(element => {if (listPermissions.indexOf(element) > -1) {
        
          isMatch = true
          return false;
        }
      });
    }
   
    return isMatch;
  }

  roleMatch(allowedRoles: any): boolean {
    var isMatch = false
    var listRoles:any = new Array()
     this.userRoles = JSON.parse(localStorage.getItem('Roles'))
   if (this.userRoles != null) {
    for (let i = 0; i < this.userRoles.length; i++) {
      listRoles.push(this.userRoles[i].name)
      
    }
    allowedRoles.forEach(element => {if (listRoles.indexOf(element) > -1) {
      
        isMatch = true
        return false;
      }
    });
   }
   
    return isMatch;
  }

}
