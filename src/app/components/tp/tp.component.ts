import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { interval } from 'rxjs';
import { ExamenService } from 'src/app/services/examen/examen.service';
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-tp',
  templateUrl: './tp.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./tp.component.scss']
})



export class TpComponent {
  
  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  public totalPoints: number = 0;
  public pointObtenu: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  progress: string = "0";
  isQuizCompleted: boolean = false;
  
  quizes: any = [];
  QuizInterval: any;
  coumpteur = 0;
  intervalId: any;
  etudiantId: any;
  coursId: any;
  
  
  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private examenService: ExamenService
    
    ) { }
    
    ngOnInit(): void {
      
      this.etudiantId = localStorage.getItem('etudiantId');
      
      this.getQuiz();
      this.startCounter();
      this.findQuizInterval();
    }
    
    // getAllQuestions() {
    //   this.questionService.getQuestionJson()
    //   .subscribe(res => {
    //     this.questionList = res.questions;
    //   })
    // }
    
    nextQuestion() {
      this.currentQuestion++;
    }
    
    previousQuestion() {
      this.currentQuestion--;
    }
    
    answer(currentQno: number, option: any) {
      if(currentQno === this.quizes.length){
        this.isQuizCompleted = true;
        this.stopCounter();
      }
      if (option.correct) {
        this.points += this.quizes[currentQno - 1]?.cote;
        const val = this.points;
        if (this.isQuizCompleted === true || currentQno === this.quizes.length)  this.save(val);
        
        this.correctAnswer++;
        setTimeout(() => {
          this.currentQuestion++;
          this.getProgressPercent();
        }, 1000);
      } else {
        this.pointObtenu -= this.quizes[currentQno - 1]?.cote;
        const val1 = this.pointObtenu;
        if (this.isQuizCompleted === true || currentQno === this.quizes.length)  this.save(val1);
        setTimeout(() => {
          this.currentQuestion++;
          this.inCorrectAnswer++;
          this.getProgressPercent();
        }, 1000);
        
        this.points;
      }
    }
    
    startCounter() {
      this.intervalId = setInterval(() => {
        this.coumpteur--;
        if (this.coumpteur === 0) {
          this.stopCounter();
          this.isQuizCompleted = true;
          
        }
      }, 1000);
      
      
    }
    
    stopCounter() {
      clearInterval(this.intervalId);
    }
    
    
    resetQuiz() {
      this.points = 0;
      this.counter = 60;
      this.currentQuestion = 0;
      this.progress = "0";
    }
    
    getProgressPercent() {
      this.progress = ((this.currentQuestion / this.quizes.length) * 100).toString();
      return this.progress;
      
    }
    
    getQuiz(){
      this.route.paramMap.subscribe({
        next: (params) =>{
          this.coursId = params.get('id');
          if (this.coursId) {
            this.examenService.findQuestionById(this.coursId)
            .subscribe({
              next: (response) =>{
                this.quizes = response; 
                this.totalPoints = this.quizes.reduce((total, item) => total + item.cote, 0);
                this.pointObtenu = this.quizes.reduce((total, item) => total + item.cote, 0);
              }
            })
          }
        }
      })
    }
    
    findQuizInterval() {
      this.route.paramMap.subscribe({
        next: (params) =>{
          const id = params.get('id');
          if (id) {
            this.examenService.findDureeById(id)
            .subscribe({
              next: (response) =>{
                this.QuizInterval = response; 
                console.log(response);
                if (this.QuizInterval.duree < 1) {
                  this.coumpteur = 30 * 60; 
                } else {
                  this.coumpteur = this.QuizInterval.duree * 3600;
                }
              }
            })
          }
        }
      })
    }
    
    
    
    save(obtenu: any) {
      const resulat = {
        max: this.totalPoints,
        points: obtenu,
        quizId: this.coursId,
        etudiantId: this.etudiantId
      };
      this.examenService.addResult(resulat).subscribe(
        (res: any) => {
          this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Felicitations.', life: 3000 });
        },
        err => {
          if (err.status == 500) 
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Desole.', life: 3000 });
          else
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Desole.', life: 3000 });
          
        }
        );
      }
      
    }
    
    
    