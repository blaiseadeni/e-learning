import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  baseApiUrl: string = environment.baseApiUrl;
  // baseApiUrl: string = 'http://192.168.142.89:70/';
  private headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  constructor(private http: HttpClient) { }
  
  findAllForums() {
    return this.http.get(this.baseApiUrl + 'api/Forum');
  }
  
  addForum(forum: any) {
    return this.http.post(this.baseApiUrl + 'api/Forum', forum, this.headers);
  }
  
  findForumById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Forum/' + id);
  }
  
  findResponseById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/ForumResponses/' + id);
  }
  
  addResponse(response: any) {
    return this.http.post(this.baseApiUrl + 'api/ForumResponses', response, this.headers);
  }
}
