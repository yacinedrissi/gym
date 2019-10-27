import { Injectable } from '@angular/core';
import { Config } from 'src/support/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  config:Config = new Config();
  API_URL = "https://" + this.config.host;
  constructor(
    private http : HttpClient
  ) { }

  getAllUserServ(idUser:any){
    return this.http.get(this.API_URL+"/users/"+idUser)
  }
  getAllUserCreatedByServ(idUser:any){
    return this.http.get(this.API_URL+"/usersCreatedBy/"+idUser)
  }
  getAllCoachByGymServ(idGym:any){
    return this.http.get(this.API_URL+"/getAllCoachByGym/"+idGym)
  }

  editUserServ(user:any,id:any){
    console.log(user);
    
    return this.http.put(this.API_URL+"/updateUser/"+id,user);
  }
  addUserServ(user:any,userID:any,id_gym:any){
    console.log(user);
    
    return this.http.post(this.API_URL+"/createuser/"+userID+"/"+id_gym,user);
  }


  deleteUserServ(userID:any){
    return this.http.delete(this.API_URL+"/deleteUser/"+userID)
  }
  assignRoleToUserServ(roleID:any,userID:any){
    return this.http.get(this.API_URL+"/RoleToUser/"+roleID+"/"+userID)
  }
  removeRoleToUserServ(roleID:any,userID:any){
    return this.http.get(this.API_URL+"/RemoveRoleToUser/"+roleID+"/"+userID)
  }
  approveUserServ(userID:any){
    return this.http.get(this.API_URL+"/approveUser/"+userID)
  }
  rejectUserServ(userID:any){
    return this.http.get(this.API_URL+"/rejecteUser/"+userID) 
  }
  assignPermissionsToUserServ(permissions:any,userID:any){
    return this.http.get(this.API_URL+"/PermissionsToUser/"+permissions+"/"+userID)
  }
}
