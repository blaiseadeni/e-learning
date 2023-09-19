import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  baseApiUrl: string = environment.baseApiUrl;
  // baseApiUrl: string = 'http://192.168.142.89:70/';
  private headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  constructor(private http: HttpClient) { }
  
  findAllEvents() {
    return this.http.get(this.baseApiUrl + 'api/Evenement');
  }
  
  findEventById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Evenement/' + id);
  }
  
  addEvent(cours: any) {
    return this.http.post(this.baseApiUrl + 'api/Evenement', cours, this.headers);
  }
  
  updateEvent(id?: string, event?: any){
    return this.http.put(this.baseApiUrl + 'api/Evenement/' + id, event);
  }
  
  deleteCours(id?: string) {
    return this.http.delete(this.baseApiUrl + 'api/Cours/' + id);
  }
  
  
}
