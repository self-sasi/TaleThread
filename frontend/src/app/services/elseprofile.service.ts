import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElseprofileService {

  username : string = '';

  constructor(private http : HttpClient) { }

  get() {
    return this.http.get(`http://127.0.0.1:8000/profile/${this.username}`);
  }

  set( elseUsername : string) {
    this.username = elseUsername;
  }
}
