import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpOrDownVoteService {

constructor( private http : HttpClient) { }

  upvoteContribution( thread_id : number, contrib_id : number ) {
    return this.http.post(`http://127.0.0.1:8000/threads/${thread_id}/contributions/${contrib_id}/upvote/`, {});
  }

  downvoteContribution( thread_id : number, contrib_id : number ) {
    return this.http.post(`http://127.0.0.1:8000/threads/${thread_id}/contributions/${contrib_id}/downvote/`, {});
  }
}
