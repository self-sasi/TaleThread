import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpOrDownVoteService {
  private domain: string | undefined;

constructor( private http : HttpClient) { 
  this.domain = environment.domain;
}

  upvoteContribution( thread_id : number, contrib_id : number ) {
    return this.http.post(`${this.domain}/threads/${thread_id}/contributions/${contrib_id}/upvote/`, {});
  }

  downvoteContribution( thread_id : number, contrib_id : number ) {
    return this.http.post(`${this.domain}/threads/${thread_id}/contributions/${contrib_id}/downvote/`, {});
  }
}
