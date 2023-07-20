import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  baseApiUrl: string = environment.baseApiUrl;
  private headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  
  
  constructor(private http: HttpClient) { }
  
  findAllEtu() {
    return this.http.get(this.baseApiUrl + 'api/Etudiant');
  }
  
  findEtuById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Etudiant/' + id);
  }
  
  addEtdudiant(etudiant: any) {
    return this.http.post(this.baseApiUrl + 'api/Etudiant', etudiant, this.headers);
  }
  
  updateEtudiant(id?: string, etudiant?: any){
    return this.http.put(this.baseApiUrl + 'api/Etudiant/' + id, etudiant);
  }
  
  deleteEtudiant(id?: string) {
    return this.http.delete(this.baseApiUrl + 'api/Etudiant/' + id);
  }
  
  
  
  findAllAudi() {
    return this.http.get(this.baseApiUrl + 'api/Auditoire');
  }
  
  findAudiById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Auditoire/' + id);
  }
  
}
