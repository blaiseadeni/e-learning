import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  baseApiUrl: string = environment.baseApiUrl;
  // baseApiUrl: string = 'http://192.168.142.89:70/';
  private headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  
  
  constructor(private http: HttpClient) { }
  
  findAllAudi() {
    return this.http.get(this.baseApiUrl + 'api/Auditoire');
  }
  
  findAudiById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Auditoire/' + id);
  }
  
  addAudi(auditoire: any) {
    return this.http.post(this.baseApiUrl + 'api/Auditoire', auditoire, this.headers);
  }
  
  updateAudi(id?: string, orientation?: any){
    return this.http.put(this.baseApiUrl + 'api/Auditoire/' + id, orientation);
  }
  
  deleteAudi(id?: string) {
    return this.http.delete(this.baseApiUrl + 'api/Auditoire/' + id);
  }
  
  
  addPromo(site: any) {
    return this.http.post(this.baseApiUrl + 'api/Promotion', site, this.headers);
  }
  
  findAllPromo() {
    return this.http.get(this.baseApiUrl + 'api/Promotion');
  }
  
  findPromoById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Promotion/' + id);
  }
  
  findAllOrient() {
    return this.http.get(this.baseApiUrl + 'api/Orientation');
  }
  
  findOrientById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Orientation/' + id);
  }
  
}
