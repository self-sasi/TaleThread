import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElseprofileService {

  username : string = '';private domain: string | undefined;
  
  constructor(private http : HttpClient) { 
    this.domain = environment.domain;
  }

  get() {
    return this.http.get(`${this.domain}/profile/${this.username}`);
  }

  set( elseUsername : string) {
    this.username = elseUsername;
  }
}
