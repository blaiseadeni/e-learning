import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { HoraireService } from 'src/app/services/horaire/horaire.service';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./horaire.component.scss']
})
export class HoraireComponent {
  
  horaireDialog: boolean = false;
  deleteDialog: boolean = false;
  
  horaireForm: FormGroup;
  
  horaires: any = [];
  horaire: any = {};
  
  cours: any = [];
  
  submitted: boolean = false;
  
  cols: any[] = [];
  
  rowsPerPageOptions = [5, 10, 20];
  
  role: any;
  etudiant = "Etudiant";
  enseignant = "Enseignant";
  admin = "Admin";
  
  
  constructor(private service: HoraireService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        { label: 'Annonces' },
        { label: 'Horaire' },
      ]);
    }
    
    ngOnInit() {
      
      this.role = localStorage.getItem('role');
      this.findAllHor();
      this.findAllCours();
      
      this.horaireForm = new FormGroup({
        dateDebut: new FormControl('', Validators.required),
        dateFin: new FormControl('', Validators.required),
        heureDebut: new FormControl('', Validators.required),
        heureFin: new FormControl('', Validators.required),
        coursId: new FormControl('', Validators.required),
      })
      
    }
    
    add() {
      if (this.horaireForm.valid) {
        const request = {
          dateDebut: this.dateDebutValue.value,
          dateFin: this.dateFinValue.value,
          heureDebut: this.heureDebutValue.value,
          heureFin: this.heureFinValue.value,
          coursId: this.coursIdValue.value.id,
        }
        if (request.dateDebut.getTime() > request.dateFin.getTime()) {
          this.messageService.add({ severity: 'error', summary: 'Info', detail: 'La date début doit être inférieure à la date fin ', life: 3000 });
        } else if (request.heureDebut.getTime() > request.heureFin.getTime()) {
          this.messageService.add({ severity: 'error', summary: 'Info', detail: 'L\'heure début doit être inférieure à l\'heure fin ', life: 3000 });
        } else {
          //Begin save
          this.service.addHor(request).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Enregistrer avec succes', life: 3000 });
              this.findAllHor();
            },
            complete: () => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Enregistrer avec succes', life: 3000 });
              this.findAllHor();
            },
            error: (err) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Enregistrer avec succes', life: 3000 });
              this.findAllHor();
            },
          })
          // end save
        }
      } else {
        this.validateAllFields(this.horaireForm)
        
      }
    }
    
    get dateDebutValue() {
      return this.horaireForm.get('dateDebut')
    }
    get dateFinValue() {
      return this.horaireForm.get('dateFin')
    }
    
    get heureDebutValue() {
      return this.horaireForm.get('heureDebut')
    }
    
    get heureFinValue() {
      return this.horaireForm.get('heureFin')
    }
    
    get coursIdValue() {
      return this.horaireForm.get('coursId')
    }
    
    findAllHor() {
      this.service.findAllHor()
      .subscribe({
        next: (response) => {
          this.horaires = response;
          console.log(this.horaires);
        },
        error: (response) => {
          console.log(response);
        }
      })
    }  
    
    findAllCours() {
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
    
    delete(id:any) {
      this.service.deleteHor(id)
      .subscribe({
        next: (response) => {
          this.findAllHor();
        },
        error: (response) => {
          console.log(response);
          this.findAllHor();
        }
      })
    }  
    
    deleteSelected(id:any) {
      this.service.findHorById(id)
      .subscribe({
        next: (response) => {
          this.horaire = response;
          this.deleteDialog = true;
        },
        error: (response) => {
          console.log(response);
        }
      })
    }
    
    edit(id:any) {
      this.service.findHorById(id)
      .subscribe({
        next: (response) => {
          this.horaire = response;
          this.horaireDialog = true;
          this.horaireForm.get("dateDebut")?.patchValue(this.horaire.dateDebut);
          this.horaireForm.get("dateFin")?.patchValue(this.horaire.dateFin);
          this.horaireForm.get("heureDebut")?.patchValue(this.horaire.heureDebut);
          this.horaireForm.get("heureFin")?.patchValue(this.horaire.heureFin);
          this.horaireForm.get("coursId")?.patchValue(this.horaire.coursId);
          
        },
        error: (response) => {
          console.log(response);
        }
      })
    }
    openNew() {
      this.submitted = false;
      this.horaireDialog = true;
    }
    
    
    hideDialog() {
      this.horaireDialog = false;
      this.submitted = false;
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
  