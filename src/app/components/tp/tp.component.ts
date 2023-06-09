import { Component } from '@angular/core';
import { clearScreenDown } from 'readline';
import { interval } from 'rxjs';
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-tp',
  templateUrl: './tp.component.html',
  styleUrls: ['./tp.component.scss']
})
export class TpComponent {
  
  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  
  gfg1: number = 0;
  gfg2: number = 0;
  alphabets = [{ a: 'a', b: 'b', c: 'c', d: 'd', e: 'e',}]
  
  constructor(private questionService: QuestionService) { }
  
  ngOnInit(): void {
    
    setInterval(() => {
      this.gfg1 = this.gfg1 + Math.floor(Math.random() * 10) + 1;
      if (this.gfg1 >= 100) {
        this.gfg1 = 100;
      }
    }, 1500),
    setInterval(() => {
      this.gfg2 = this.gfg2 + Math.floor(Math.random() * 10) + 3;
      if (this.gfg2 >= 100) {
        this.gfg2 = 100;
      }
    }, 1500);
    
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
    
    
  }
  getAllQuestions() {
    this.questionService.getQuestionJson()
    .subscribe(res => {
      this.questionList = res.questions;
    })
  }
  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number, option: any) {
    
    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
      
      
    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
      
      this.points -= 10;
    }
  }
  startCounter() {
    this.interval$ = interval(1000)
    .subscribe(val => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";
  }
  
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
    
  }
  
}
