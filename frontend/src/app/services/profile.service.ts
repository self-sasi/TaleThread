import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private domain: string | undefined;
  
  constructor(private http : HttpClient) { 
    this.domain = environment.domain;
  }

  get(){
    return this.http.get(`${this.domain}/profile`);
  }

  update(updatedDetails : any){
    return this.http.put(`${this.domain}/profile/update/`, updatedDetails);
  }

  logout() {
    return this.http.post(`${this.domain}/auth/logout`, {});
  }

}
