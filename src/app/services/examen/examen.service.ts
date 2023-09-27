import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  baseApiUrl: string = environment.baseApiUrl;
  // baseApiUrl: string = 'http://192.168.142.89:70/';
  private headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  
  constructor(private http: HttpClient) { }
  
  findAllQuizes() {
    return this.http.get(this.baseApiUrl + 'api/Quiz');
  }
  
  addQuiz(quiz: any) {
    return this.http.post(this.baseApiUrl + 'api/Quiz', quiz, this.headers);
  }
  
  findQuestionById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/QuestionQuiz/' + id);
  }
  
  findQuizById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Quiz/' + id);
  }

  find(id: any) {
    return this.http.get(this.baseApiUrl + 'api/Quiz/quizes/' + id);
  }
  
  findDureeById(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Duree/' + id);
  }
  
  addResult(resulat: any) {
    return this.http.post(this.baseApiUrl + 'api/Resultats', resulat, this.headers);
  }
}