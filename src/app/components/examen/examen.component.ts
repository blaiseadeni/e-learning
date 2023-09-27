import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CoursService } from 'src/app/services/cours/cours.service';
import { ExamenService } from 'src/app/services/examen/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  providers: [MessageService],
  styleUrls: ['./examen.component.scss']
})
export class ExamenComponent {
  
  auditoires: any = [];
  
  cours: any = [];
  
  quizForm!: FormGroup<any>;
  
  questionForm!: FormGroup<any>;
  
  
  constructor(
    private fb: FormBuilder,
    private service: CoursService,
    private quizService: ExamenService,
    private messageService: MessageService,
    private route: Router
    ) { }
    
    ngOnInit(): void {
      this.quizForm = this.fb.group({
        libelle: [],
        dateQuiz: [],
        heureDebut: [],
        heureFin: [],
        coursId: [],
        auditoire:[]
      });    
      this.findAllCours();
      
      this.questionForm = this.fb.group({
        questions: this.fb.array([])
      });
      
    }
        
    findAllCours() {
      this.service.findAllAud()
      .subscribe({
        next: (response) => {
          this.auditoires = response;
          console.log(this.auditoires);
        },
        error: (response) => {
          console.log(response);
        }
      })
    }  
    
    findCours(event:any) {
      this.service.findCoursByAudi(event.value.id)
      .subscribe({
        next: (response) => {
          this.cours = response;
          console.log(this.cours);
        },
        error: (response) => {
          console.log(response);
        }
      })
    }
    
    
    
    questionList(): FormArray {
      return this.questionForm.get('questions') as FormArray;
    }
    
    newQuestion(): FormGroup {
      return this.fb.group({
        question: '',
        cote:'',
        responses: this.fb.array([])
      });
    }
    
    addQuestion() {
      this.questionList().push(this.newQuestion());
    }
    
    removeQuestion(questIndex: number) {
      this.questionList().removeAt(questIndex);
    }
    
    questionResponses(questIndex: number): FormArray {
      return this.questionList()
      .at(questIndex)
      .get('responses') as FormArray;
    }
    
    newResponse(): FormGroup {
      return this.fb.group({
        reponse: '',
        correct: false
      });
    }
    
    addQuestionResponse(questIndex: number) {
      this.questionResponses(questIndex).push(this.newResponse());
    }
    
    removeQuestionResponse(questIndex: number, respIndex: number) {
      this.questionResponses(questIndex).removeAt(respIndex);
    }
    
    private validateAllFields(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach((field) => {
        const control = formGroup.get(field)
        
        if (control instanceof FormControl) {
          control.markAsDirty({ onlySelf: true })
        } else if (control instanceof FormGroup) {
          this.validateAllFields(control)
        }
      })
    }
    
    
    save() {
      const request = {
        libelle: this.libelleValue.value,
        dateQuiz: this.dateQuizValue.value,
        heureDebut: this.heureDebutValue.value,
        heureFin: this.heureFinValue.value,
        auditoire: this.auditoireValue.value.libelle,
        coursId: this.coursIdValue.value.id,
        questions: this.questionForm.value.questions,
      }
      const value = JSON.stringify(request);
      this.quizService.addQuiz(value).subscribe({
        next: (value) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Enregistrer avec succès', life: 3000 });
              this.route.navigate(['evaluation/interro'])
     
        },
        complete: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Enregistrer avec succès', life: 3000 });
               this.route.navigate(['evaluation/interro'])

        },
        error: (e) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Enregistrer avec succès', life: 3000 });
               this.route.navigate(['evaluation/interro'])
        }
        
      })
    }
    
    get libelleValue() {
      return this.quizForm.get('libelle')
    } 
    
    get auditoireValue() {
      return this.quizForm.get('auditoire')
    } 
    
    get dateQuizValue() {
      return this.quizForm.get('dateQuiz')
    } 
    
    get heureDebutValue() {
      return this.quizForm.get('heureDebut')
    } 
    
    get heureFinValue() {
      return this.quizForm.get('heureFin')
    } 
    
    get coursIdValue() {
      return this.quizForm.get('coursId')
    } 
    
    get responseValue() {
      return this.quizForm.get('reponse')
    } 
    
    get correctValue() {
      return this.quizForm.get('correct')
    } 
    
    get questionValue() {
      return this.quizForm.get('question')
    } 
    
  }