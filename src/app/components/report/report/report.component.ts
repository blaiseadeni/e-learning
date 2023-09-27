import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AnneeService } from 'src/app/services/annee/annee.service';
import { CoursService } from 'src/app/services/cours/cours.service';
import { PromotionService } from 'src/app/services/promotion/promotion.service';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [MessageService],
  
})
export class ReportComponent {
  
  reportForm: FormGroup;
  cours: any = [];
  annees: any = [];
  auditoires: any = [];
  url: any ;
  
  constructor(
    private coursService: CoursService, 
    private anneeservice: AnneeService,
    private auditoireService: PromotionService,
    private service: ReportService,
    private messageService: MessageService,
    private route: ActivatedRoute
    ){}
    
    ngOnInit() {
      this.findAllAnnees();
      this.findAllCous();
      this.findAllAudi();
      
      this.reportForm = new FormGroup({
        coursId: new FormControl('', Validators.required),
        auditoireId: new FormControl('', Validators.required),
        anneeId: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
      })
    }
    
    findAllCous() {
      this.coursService.findAllCours()
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
    
    
    findAllAnnees() {
      this.anneeservice.findAll()
      .subscribe({
        next: (response) => {
          this.annees = response;
          console.log(this.annees);
        },
        error: (response) => {
          console.log(response);
        }
      })
    }  
    
    findAllAudi() {
      this.auditoireService.findAllAudi()
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
    
    
    get coursIdValue() {
      return this.reportForm.get('coursId')
    } 
    
    get auditoireIdValue() {
      return this.reportForm.get('auditoireId')
    } 
    
    get anneeIdValue() {
      return this.reportForm.get('anneeId')
    } 
    
    get dateValue() {
      return this.reportForm.get('date')
    } 
    
    print() {
      if (this.reportForm.valid) {
        const request = {
          coursId: this.coursIdValue.value.id,
          anneeId: this.anneeIdValue.value.id,
          auditoireId: this.auditoireIdValue.value.id,
          date: this.dateValue.value
        }
        console.log(request);
        
        this.service.print(request)
        .subscribe({
          next: (response) => {
            let blob: Blob = response.body as Blob;
            this.url = blob;
          },
          complete: () => {
            
          },
          error: (e) => {
            this.messageService.add({ severity: 'eroor', summary: 'error', detail: 'Non trouvé', life: 3000 });
          }
        });
      } else {
        this.validateAllFields(this.reportForm);
      }
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
    
  }
  