import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private domain: string | undefined;
  
  constructor(private http : HttpClient) { 
    this.domain = environment.domain;
  }

  acceptRequest( username : string ) {
    return this.http.post(`${this.domain}/profile/accept_request/${username}/`, {});
  }

  rejectRequest ( username : string ) {
    return this.http.post(`${this.domain}/profile/reject_request/${username}/`, {});
  }
}
