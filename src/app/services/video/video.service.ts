import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  baseApiUrl: string = environment.baseApiUrl;
  // baseApiUrl: string = 'http://192.168.142.89:70/';
  headers={
    headers: new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Accept': 'application/json'
    })
  };
  
  
  constructor(private http: HttpClient) { }
  
  findAllVideos() {
    return this.http.get(this.baseApiUrl + 'api/Video');
  }
  
  findVideoById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Video/' + id);
  }
  
  addVideo(video: any) {
    return this.http.post(this.baseApiUrl + 'api/Video', video, this.headers);
  }
  
  updateVideo(id?: string, video?: any){
    return this.http.put(this.baseApiUrl + 'api/Video/' + id, video);
  }
  
  deleteVideo(id?: string) {
    return this.http.delete(this.baseApiUrl + 'api/Video/' + id);
  }
  
  findAllCours() {
    return this.http.get(this.baseApiUrl + 'api/Cours');
  }
}
