import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http : HttpClient) { }

  signup( user : any) {
    return this.http.post("http://127.0.0.1:8000/auth/signup", user);
  }

  login( user : any) {
    return this.http.post("http://127.0.0.1:8000/auth/login", user);
  }
}
