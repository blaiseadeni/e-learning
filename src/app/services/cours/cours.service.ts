import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  
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
  
  findAllCours() {
    return this.http.get(this.baseApiUrl + 'api/Cours');
  }
  
  findCoursById(id: any) {
    return this.http.get(this.baseApiUrl + 'api/Cours/' + id);
  }
  
  addCours(cours: any) {
    return this.http.post(this.baseApiUrl + 'api/Cours', cours, this.headers);
  }
  
  updateCours(id?: any, cours?: any){
    return this.http.put(this.baseApiUrl + 'api/Cours/' + id, cours);
  }
  
  deleteCours(id?: any) {
    return this.http.delete(this.baseApiUrl + 'api/Cours/' + id);
  }
  
  findAllEns() {
    return this.http.get(this.baseApiUrl + 'api/Enseignant');
  }
  findAllAud() {
    return this.http.get(this.baseApiUrl + 'api/Auditoire');
  }
  
  findAudiById(id: any) {
    return this.http.get(this.baseApiUrl + 'api/Auditoire/' + id);
  }
  
  addAud(departement: any) {
    return this.http.post(this.baseApiUrl + 'api/Auditoire', departement, this.headers);
  }
  
  updateAudi(id?: any, departement?: any){
    return this.http.put(this.baseApiUrl + 'api/Auditoire/' + id, departement);
  }
  
  deleteAudi(id?: any) {
    return this.http.delete(this.baseApiUrl + 'api/Auditoire/' + id);
  }
  
  findCoursByAudi(id: string) {
    return this.http.get(this.baseApiUrl + 'api/CoursAudi/' + id);
  }
}
