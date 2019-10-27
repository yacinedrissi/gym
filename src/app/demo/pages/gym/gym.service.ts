import { Injectable } from '@angular/core';
import { Config } from 'src/support/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GymService {
  config:Config = new Config();
  API_URL = "https://" + this.config.host;
  constructor(
    private http : HttpClient
  ) { }
  private subject: any = null;
  setData(data: any) {
      this.subject = data;
  }
  getData() {
      return this.subject;
  }
  getAllGymServ(){
    return this.http.get(this.API_URL+"/getAllGym")
  }
  getAllGymByOIDServ(idUser:any){
    return this.http.get(this.API_URL+"/getAllGymByUserId/"+idUser)
  }
  getGymByCoachServ(idGym:any){
    return this.http.get(this.API_URL+"/getGymByCoach/"+idGym)
  }
  getAllSubscriptionByOIDServ(idGym:any){
    return this.http.get(this.API_URL+"/getAllSubscriptionById_gym/"+idGym)
  }
  getAllSubscriptionServ(){
    return this.http.get(this.API_URL+"/getAllSubscription")
  }

  editGymServ(gym:any,id:any){
    return this.http.put(this.API_URL+"/updateGym/"+id,gym);
  }
  addGymServ(gym:any){

     const HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "multipart/form-data"})
    } 
    console.log(gym);
    
    return this.http.post(this.API_URL+"/createGym",gym,HttpUploadOptions);
  }
  addSubscriptionServ(subscription:any){
    return this.http.post(this.API_URL+"/createSubscription",subscription);
  }


  deleteGymServ(gymID:any){
    return this.http.delete(this.API_URL+"/deleteGym/"+gymID)
  }
}
