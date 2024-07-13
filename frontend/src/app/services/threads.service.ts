import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {

  constructor( private http : HttpClient) { }

  get(threadId : string = '') {
    return this.http.get(`http://127.0.0.1:8000/threads/`);
  }
}
