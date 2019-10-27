import { Injectable } from '@angular/core';
import { Config } from 'src/support/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  config:Config = new Config();
  API_URL = "https://" + this.config.host;
  constructor(
    private http : HttpClient
  ) { }


  getAllSubscriptionByOIDServ(idGym:any){
    return this.http.get(this.API_URL+"/getAllSubscriptionById_gym/"+idGym)
 }

 addSubscriptionServ(subscription:any){
  return this.http.post(this.API_URL+"/createSubscription",subscription);
}
editSubscriptionServ(id:any,subscription:any){
  return this.http.put(this.API_URL+"/updateSubscription/"+id,subscription);
}

deleteSubscriptionServ(subscriptionID:any){
  return this.http.delete(this.API_URL+"/deleteSubscription/"+subscriptionID)
}
}
