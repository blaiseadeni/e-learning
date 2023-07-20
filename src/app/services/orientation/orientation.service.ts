import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrientationService {
  baseApiUrl: string = environment.baseApiUrl;
  private headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  
  
  constructor(private http: HttpClient) { }
  
  findAllOrs() {
    return this.http.get(this.baseApiUrl + 'api/Orientation');
  }
  
  findOrById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Orientation/' + id);
  }
  
  addOr(orientation: any) {
    return this.http.post(this.baseApiUrl + 'api/Orientation', orientation, this.headers);
  }
  
  updateOr(id?: string, orientation?: any){
    return this.http.put(this.baseApiUrl + 'api/Orientation/' + id, orientation);
  }
  
  deleteOr(id?: string) {
    return this.http.delete(this.baseApiUrl + 'api/Orientation/' + id);
  }
  
  findAllOps() {
    return this.http.get(this.baseApiUrl + 'api/Option');
  }
  
  findOpById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Option/' + id);
  }
  
  findAllSites() {
    return this.http.get(this.baseApiUrl + 'api/Sites');
  }
  
  findSiteById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Sites/' + id);
  }
  
  addSite(site: any) {
    return this.http.post(this.baseApiUrl + 'api/Sites', site, this.headers);
  }
  
}
