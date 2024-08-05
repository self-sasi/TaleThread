import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {

  private domain: string | undefined;
  
  constructor(private http : HttpClient) { 
    this.domain = environment.domain;
  }

  get(threadId : string = '') {
    return this.http.get(`${this.domain}/threads/`);
  }

  post( threadSpecifications : any) {
    return this.http.post(`${this.domain}/threads/`, threadSpecifications);
  }
}
