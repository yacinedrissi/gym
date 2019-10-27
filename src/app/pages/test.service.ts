import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {


  URI:string = "http://127.0.0.1:8000/getAllPermissions"
  constructor(
    private http:HttpClient
  ) { }

  getAllPermissionsService(){
    return this.http.get(this.URI)
  }
}
