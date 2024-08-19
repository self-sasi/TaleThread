import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private domain: string | undefined;
  
  constructor(private http : HttpClient) { 
    this.domain = environment.domain;
  }

  sendRequest( username : string ) {
    return this.http.post(`${this.domain}/profile/send_request/${username}`, {});
  }

  acceptRequest( username : string ) {
    return this.http.post(`${this.domain}/profile/accept_request/${username}`, {});
  }

  rejectRequest( username : string ) {
    return this.http.post(`${this.domain}/profile/reject_request/${username}`, {});
  }

  remove( username : string ) {
    return this.http.delete(`${this.domain}/profile/remove_friend/${username}`);
  }
}
