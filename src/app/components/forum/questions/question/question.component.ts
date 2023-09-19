import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { ForumService } from 'src/app/services/forum/forum.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  text: string;
  
  forumForm: FormGroup;
  
  question: any = {};
  
  /**
  *
  */
  constructor(private messageService: MessageService,
    private service: ForumService,
    private router: Router,
    private breadcrumbService: BreadcrumbService)  {
      this.breadcrumbService.setItems([
        { label: 'Configurations' },
        { label: 'Question' },
      ]);
    }
    
    OnInit(){
      
    }
    
    save() {
      console.log(this.question);
      this.service.addForum(this.question).subscribe({
        next: (value) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Enregistrer avec succes', life: 3000 });
          this.router.navigate(['conference/forum'])
        },
        complete: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Enregistrer avec succes', life: 3000 });
          this.router.navigate(['conference/forum'])
        },
        error: (err) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Enregistrer avec succes', life: 3000 });
          this.router.navigate(['conference/forum'])
        },
      })
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
    
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
  }
  