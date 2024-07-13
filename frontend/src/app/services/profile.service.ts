import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private http : HttpClient) { }

  get(){
    return this.http.get("http://127.0.0.1:8000/profile");
  }

  update(profileDetails : any){
    return this.http.post("http://127.0.0.1:8000/profile", profileDetails);
  }

  logout() {
    return this.http.post("http://127.0.0.1:8000/auth/logout", {});
  }
}
