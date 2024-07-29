import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

constructor( private http : HttpClient) { }

  acceptRequest( username : string ) {
    return this.http.post(`http://127.0.0.1:8000/profile/accept_request/${username}/`, {});
  }

  rejectRequest ( username : string ) {
    return this.http.post(`http://127.0.0.1:8000/profile/reject_request/${username}/`, {});
  }
}
