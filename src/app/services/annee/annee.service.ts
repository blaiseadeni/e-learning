import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnneeService {
  baseApiUrl: string = environment.baseApiUrl;
  // baseApiUrl: string = 'http://192.168.142.89:70/';
  private headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  
  constructor(private http: HttpClient) { }
  
  findAll() {
    return this.http.get(this.baseApiUrl + 'api/Annees');
  }
  
  findById(id: any) {
    return this.http.get(this.baseApiUrl + 'api/Annees/' + id);
  }
  
  add(annee: any) {
    return this.http.post(this.baseApiUrl + 'api/Annees', annee, this.headers);
  }
  
  update(id?: any, annee?: any){
    return this.http.put(this.baseApiUrl + 'api/Annees/' + id, annee);
  }
  
}
