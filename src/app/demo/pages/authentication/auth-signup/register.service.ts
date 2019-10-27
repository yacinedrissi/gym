import { Injectable } from '@angular/core';
import { Config } from 'src/support/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  config:Config= new Config();
  API_URL = "https://" + this.config.host;

  constructor(
    private http:HttpClient
  ) { }

   registerServ(user:any){

    return this.http.post(this.API_URL+"/user/register",user);
   }


}
