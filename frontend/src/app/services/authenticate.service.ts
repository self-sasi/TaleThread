import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private domain: string | undefined;

  constructor(private http : HttpClient) { 
    this.domain = environment.domain;
  }

  signup( user : any) {
    return this.http.post(`${this.domain}/auth/signup`, user);
  }

  login( user : any) {
    return this.http.post(`${this.domain}/auth/login`, user);
  }
}
