import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  baseApiUrl: string = environment.baseApiUrl;
  private headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  
  
  constructor(private http: HttpClient) { }
  
  findAllOptions() {
    return this.http.get(this.baseApiUrl + 'api/Option');
  }
  
  findOptionById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Option/' + id);
  }
  
  addOption(option: any) {
    return this.http.post(this.baseApiUrl + 'api/Option', option, this.headers);
  }
  
  updateOption(id?: string, option?: any){
    return this.http.put(this.baseApiUrl + 'api/Option/' + id, option);
  }
  
  deleteOption(id?: string) {
    return this.http.delete(this.baseApiUrl + 'api/Option/' + id);
  }
  
  findAllDeps() {
    return this.http.get(this.baseApiUrl + 'api/Departement');
  }
  
  findDepById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Departement/' + id);
  }
    
}
