import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  baseApiUrl: string = environment.baseApiUrl;
  // baseApiUrl: string = 'http://192.168.142.89:70/';
  private headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  
  
  constructor(private http: HttpClient) { }
  
  findAllSections() {
    return this.http.get(this.baseApiUrl + 'api/Section');
  }
  
  findSectionById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Section/' + id);
  }
  
  addSection(section: any) {
    return this.http.post(this.baseApiUrl + 'api/Section', section, this.headers);
  }
  
  updateSection(id?: string, section?: any){
    return this.http.put(this.baseApiUrl + 'api/Section/' + id, section);
  }
  
  deleteSection(id?: string) {
    return this.http.delete(this.baseApiUrl + 'api/Section/' + id);
  }
  
  findAllDeps() {
    return this.http.get(this.baseApiUrl + 'api/Departement');
  }
  
  findDepById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Departement/' + id);
  }
  
  addDep(departement: any) {
    return this.http.post(this.baseApiUrl + 'api/Departement', departement, this.headers);
  }
  
  updateDep(id?: string, departement?: any){
    return this.http.put(this.baseApiUrl + 'api/Departement/' + id, departement);
  }
  
  deleteDep(id?: string) {
    return this.http.delete(this.baseApiUrl + 'api/Departement/' + id);
  }
}
