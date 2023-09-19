import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { ProductService } from 'src/app/demo/service/productservice';
import { AnneeService } from 'src/app/services/annee/annee.service';
import { CoursService } from 'src/app/services/cours/cours.service';


@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent {
  
  role: any;
  etudiant = "Etudiant";
  enseignant = "Enseignant";
  admin = "Admin";
  
  image_url: any;
  
  coursForm: FormGroup;
  
  file?:File;
  
  auditoires: any = [];
  enseignants: any = [];
  cours: any = [];
  annees: any = [];
  heures: any[] = [];
  
  coursDialog: boolean ;
  deleteDialog: boolean;
  
  submitted: boolean = false;
  
  cols: any[] = [];
  
  statuses: any[] = [];
  
  rowsPerPageOptions = [5, 10, 20];
  
  constructor(
    private service: CoursService, 
    private anneeservice: AnneeService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService,private productService: ProductService) {
      this.breadcrumbService.setItems([
        { label: 'ISI-COURS' },
        { label: 'Cours' },
      ]);
    }
    
    ngOnInit() {
      
      this.role = localStorage.getItem('role');
      
      this.findAllAudi();
      this.findAllEns();
      this.findAllCous();
      this.findAllAnnees();
      this.coursForm = new FormGroup({
        titre: new FormControl('', Validators.required),
        chargeHoraire: new FormControl('', Validators.required),
        auditoireId: new FormControl('', Validators.required),
        enseignantId: new FormControl('', Validators.required),
        anneeId: new FormControl('', Validators.required),
        file: new FormControl([],Validators.required),
      })
      
      this.heures = [
        { libelle: '15h', value: '15h' },
        { libelle: '20h', value: '20h' },
        { libelle: '30h', value: '30h' },
        { libelle: '45h', value: '45h' },
        { libelle: '60h', value: '60h' },
        { libelle: '90h', value: '90h' },
        { libelle: '120h', value: '120h' },
        
      ];
    }
    
    add() {
      if (this.coursForm.valid) {
        let formData:FormData = new FormData(); 
        formData.append("chargeHoraire",this.chargeHoraireValue.value.value);
        formData.append("enseignantId",this.enseignantIdValue.value.id);
        formData.append("anneeId",this.anneeIdValue.value.id);
        formData.append("auditoireId",this.auditoireIdValue.value.id);
        formData.append("titre",this.titreValue.value);
        formData.append("file",this.file[0]);
        if (this.cours.id) {
          this.service.updateCours(this.cours.id, formData).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Success', life: 3000 }); this.findAllEns();
              this.hideDialog();
            },
            complete: () => {
              this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Modification avec succès', life: 3000 });
              this.findAllCous();
              this.hideDialog(); 
            },
            error: (e) => {
              this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Modification avec succès', life: 3000 });
              this.findAllCous();
              this.hideDialog();
            }
            
          })
        } else {
          this.service.addCours(formData).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 });
              this.findAllEns();
              this.hideDialog();
            },
            complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Enregistrement avec succès', life: 3000 }); this.findAllCous(); this.hideDialog();},
            
          })
        }
      } else {
        this.validateAllFields(this.coursForm)
      };
    }
    
    get enseignantIdValue() {
      return this.coursForm.get('enseignantId')
    } 
    get auditoireIdValue() {
      return this.coursForm.get('auditoireId')
    } 
    get titreValue() {
      return this.coursForm.get('titre')
    } 
    get chargeHoraireValue() {
      return this.coursForm.get('chargeHoraire')
    } 
    get anneeIdValue() {
      return this.coursForm.get('anneeId')
    } 
    
    findAllAudi() {
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
    
    findAllEns() {
      this.service.findAllEns()
      .subscribe({
        next: (response) => {
          this.enseignants = response;
          console.log(this.enseignants);
        },
        error: (response) => {
          console.log(response);
        }
      })
    }  
    
    findAllCous() {
      this.service.findAllCours()
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
    
    onImageChanged(files) {
      this.file = files;          
    }
    
    deleteSelected(id:any) {
      this.service.findCoursById(id)
      .subscribe({
        next: (response) => {
          this.cours = response;
          this.deleteDialog = true;
        },
        error: (response) => {
          console.log(response);
        }
      })
    }
    
    edit(id:any) {
      this.service.findCoursById(id)
      .subscribe({
        next: (response) => {
          this.cours = response;
          this.coursDialog = true;
          this.coursForm.get("enseignantId")?.patchValue(this.cours.enseignantId);
          this.coursForm.get("auditoireId")?.patchValue(this.cours.auditoireId);
          this.coursForm.get("titre")?.patchValue(this.cours.titre);
          this.coursForm.get("chargeHoraire")?.patchValue(this.cours.chargeHoraire);
          
        },
        error: (response) => {
          console.log(response);
        }
      })
    }
    
    
    openNew() {
      this.coursDialog = true;
    }
    
    
    hideDialog() {
      this.coursDialog = false;
    }
    
    
    
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
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
  