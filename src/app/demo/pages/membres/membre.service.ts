import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/support/config';

@Injectable({
  providedIn: 'root'
})
export class MembreService {
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
  getAllMembreServ(){
    return this.http.get(this.API_URL+"/getAllMembers")
  }
  getAllMembreByOIDServ(idGym:any){
    return this.http.get(this.API_URL+"/getAllMembersById_gym/"+idGym)
  }
 
  

  editMembreServ(membre:any,id:any){
    return this.http.put(this.API_URL+"/updateMembre/"+id,membre);
  }
  addMembreServ(membre:any){
    return this.http.post(this.API_URL+"/createMember",membre);
  }
  

  deleteMembreServ(membreID:any){
    return this.http.delete(this.API_URL+"/deleteMembre/"+membreID)
  }
  getAllPayment_historyBymemberServ(memberID:any){
    return this.http.get(this.API_URL+"/getAllPayment_historyBymember/"+memberID)
  }
}
