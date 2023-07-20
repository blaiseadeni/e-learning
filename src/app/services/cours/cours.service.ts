import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  
  baseApiUrl: string = environment.baseApiUrl;
  private headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  
  
  constructor(private http: HttpClient) { }
  
  findAllCours() {
    return this.http.get(this.baseApiUrl + 'api/Cours');
  }
  
  findCoursById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Cours/' + id);
  }
  
  addCours(cours: any) {
    return this.http.post(this.baseApiUrl + 'api/Cours', cours, this.headers);
  }
  
  updateCours(id?: string, cours?: any){
    return this.http.put(this.baseApiUrl + 'api/Cours/' + id, cours);
  }
  
  deleteCours(id?: string) {
    return this.http.delete(this.baseApiUrl + 'api/Cours/' + id);
  }
  
  findAllEns() {
    return this.http.get(this.baseApiUrl + 'api/Enseignant');
  }
  findAllAud() {
    return this.http.get(this.baseApiUrl + 'api/Auditoire');
  }
  
  findAudiById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Auditoire/' + id);
  }
  
  addAud(departement: any) {
    return this.http.post(this.baseApiUrl + 'api/Auditoire', departement, this.headers);
  }
  
  updateAudi(id?: string, departement?: any){
    return this.http.put(this.baseApiUrl + 'api/Auditoire/' + id, departement);
  }
  
  deleteAudi(id?: string) {
    return this.http.delete(this.baseApiUrl + 'api/Auditoire/' + id);
  }
}
