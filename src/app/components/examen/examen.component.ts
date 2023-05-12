import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss']
})
export class ExamenComponent {
  questionForm!: FormGroup<any>;
  
  questiondetails !: FormArray<any>;
  
  question !: FormGroup<any>;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.questionForm = this.fb.group({
      libelle: [],
      cours: [],
      question: [],
      questionDetailist: this.fb.array([]),
    });    
  }
  
  private createNewRows(): FormGroup {
    return this.fb.group({
      response: [],
      assertion: []
    });
  }
  
  public get newRowsList(): FormArray {
    return <FormArray>this.questionForm.get('questionDetailist');
  }
  
  public addNewRows(): void {
    this.newRowsList.push(this.createNewRows());
  }

    remove(index: any) {
    this.newRowsList.removeAt(index);
  }
}