import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HoraireService {
  baseApiUrl: string = environment.baseApiUrl;
  // baseApiUrl: string = 'http://192.168.142.89:70/';
  private headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  constructor(private http: HttpClient) { }
  
  findAllHor() {
    return this.http.get(this.baseApiUrl + 'api/Horaire');
  }
  
  findHorById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Horaire/' + id);
  }
  
  find(id: any) {
    return this.http.get(this.baseApiUrl + 'api/Horaire/horaire/' + id);
  }
  
  addHor(horaire: any) {
    return this.http.post(this.baseApiUrl + 'api/Horaire', horaire, this.headers);
  }
  
  updateHor(id?: string, horaire?: any){
    return this.http.put(this.baseApiUrl + 'api/Horaire/' + id, horaire);
  }
  
  deleteHor(id?: string) {
    return this.http.delete(this.baseApiUrl + 'api/Horaire/' + id);
  }
  
  findAllCours() {
    return this.http.get(this.baseApiUrl + 'api/Cours');
  }
  
}
