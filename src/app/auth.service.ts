import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class AuthService{

    constructor(private http:HttpClient) { }
  
    isLoggedIn(){
        return localStorage.getItem('token');
      }

      testExistMailServices(email:string){
        var apiUrl="http://apilayer.net/api/check"
        return this.http.get(apiUrl, {
            params: new HttpParams()
                .set('access_key', "783ef46d5d83415e078b4fa34ef7bd30")
                .set('email', email)
        }).pipe(
            //tap(data => console.log(data))
        );
    }
    
}