import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibrairieService {
  baseApiUrl: string = environment.baseApiUrl;
  // baseApiUrl: string = 'http://192.168.142.89:70/';
  // private headers = {
  //   headers: new HttpHeaders().set('Content-Type', 'application/json')
  // };
  
  constructor(private http: HttpClient) { }
  
  findAllCours() {
    return this.http.get(this.baseApiUrl + 'api/Cours');
  }
  
  findCoursById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Cours/' + id);
  }
  
  
}
