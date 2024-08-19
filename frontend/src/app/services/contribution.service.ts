import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  private domain: string | undefined;
  
  constructor(private http : HttpClient) { 
    this.domain = environment.domain;
  }

  writeContribution(threadId : string, contributionText: string) {
    return this.http.post(`${this.domain}/threads/${threadId}/contributions/`, {"content": contributionText});
  }
}
