import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseApiUrl: string = environment.baseApiUrl;
  // baseApiUrl: string = 'http://192.168.142.89:70/';
  private headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  
  constructor(private http: HttpClient) { }
  
  sendMessage(message: any) {
    return this.http.post(this.baseApiUrl + 'api/Chat', message, this.headers);
  }
  
  findAllAuthor(users:any) {
    return this.http.post(this.baseApiUrl + 'api/Messages/author',users, this.headers);
  }
  
  findAllReceiver(users:any) {
    return this.http.post(this.baseApiUrl + 'api/Messages/receiver',users, this.headers);
  }
  
  
  updateMessage(id?: string, message?: any){
    return this.http.put(this.baseApiUrl + 'api/Chats/' + id, message);
  }
  
  findStudentById(id: string, ) {
    return this.http.get(this.baseApiUrl + 'api/Etudiant/' + id);
  }
}
