import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  baseApiUrl: string = environment.baseApiUrl;
  // baseApiUrl: string = 'http://192.168.142.89:70/';
  // private headers = {
  //   headers: new HttpHeaders().set('Content-Type', 'application/json')
  // };
  headers={
    headers: new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Accept': 'application/json'
    })
  };
  
  
  
  constructor(private http: HttpClient) { }
  
  findAllEns() {
    return this.http.get(this.baseApiUrl + 'api/Enseignant');
  }
  
  findEnsById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Enseignant/' + id);
  }
  
  addEnseignant(enseignant: any) {
    return this.http.post(this.baseApiUrl + 'api/Enseignant', enseignant, this.headers);
  }
  
  updateEnseignant(id?: string, enseignant?: any){
    return this.http.put(this.baseApiUrl + 'api/Enseignant/' + id, enseignant);
  }
  
  deleteEnseignant(id?: string) {
    return this.http.delete(this.baseApiUrl + 'api/Enseignant/' + id);
  }
  
}
