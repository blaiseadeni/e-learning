import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { AnneeService } from 'src/app/services/annee/annee.service';
import { EtudiantService } from 'src/app/services/etudiant/etudiant.service';


@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./etudiant.component.scss']
})


export class EtudiantComponent {
  
  image_url: any;
  
  image: any;
  
  file?:any=[];
  
  sexes: any = [];
  
  auditoires: any = [];
  
  annees: any = [];
  
  etudiantForm: FormGroup;
  
  etudiant: any = {};
  
  etudiants: any = [];
  
  etudiantDialog: boolean = false;
  
  deleteDialog: boolean = false;
  
  formData = new FormData();
  
  submitted: boolean = false;
  
  cols: any[] = [];
  
  rowsPerPageOptions = [5, 10, 20];
  
  role: any;
  etudiantR = "Etudiant";
  enseignant = "Enseignant";
  admin = "Admin";
  
  constructor(private messageService: MessageService,
    private service: EtudiantService,
    private anneeService: AnneeService,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        { label: 'ISI-ETU' },
        { label: 'Etudiant' },
      ]);
    }
    
    ngOnInit() {
      this.role = localStorage.getItem('role');
      this.etudiantForm = new FormGroup({
        nom: new FormControl('', Validators.required),
        postnom: new FormControl('', Validators.required),
        prenom: new FormControl('', Validators.required),
        genre: new FormControl('', Validators.required),
        contact: new FormControl('', Validators.required),
        mail: new FormControl('', Validators.required),
        file: new FormControl([]),
        auditoireId: new FormControl('', Validators.required),
        anneeId: new FormControl('', Validators.required),
      })
      
      this.sexes = [
        { label: 'Féminin', value: 'feminin' },
        { label: 'Masculin', value: 'masculin' }
      ];
      
      this.findAllAudi();
      this.findAllEtu();
      this.findAllAnnees();
      
    }
    
    
    
    onImageChanged(files) {
      
      if (files.length === 0) {
        return;
      }
      
      
      let reader = new FileReader();
      this.file = files;
      reader.onload = () => {
        this.image_url = reader.result;
      };
      reader.readAsDataURL(this.file[0]);     
    }
    
    
    findAllAudi() {
      this.service.findAllAudi()
      .subscribe({
        next: (response) => {
          this.auditoires = response;
          // console.log(this.auditoires);
        },
        error: (Response) => {
          console.log(Response);
        }
      })
    }  
    
    findAllAnnees() {
      this.anneeService.findAll()
      .subscribe({
        next: (response) => {
          this.annees = response;
          // console.log(this.annees);
        },
        error: (Response) => {
          console.log(Response);
        }
      })
    }  
    
    findAllEtu() {
      this.service.findAllEtu()
      .subscribe({
        next: (response) => {
          this.etudiants = response;
          console.log(this.etudiants);
          
        },
        error: (response) => {
          console.log(response);
        }
      })
    }  
    
    
    addEtdudiant() {
      if (this.etudiantForm.valid) {
        
        this.formData.append("nom", this.nomValue.value);
        this.formData.append("postnom", this.postnomValue.value);
        this.formData.append("prenom", this.prenomValue.value);
        this.formData.append("genre", this.genreValue.value.value);
        this.formData.append("contact", this.contactValue.value);
        this.formData.append("mail", this.mailValue.value);
        this.formData.append("auditoireId", this.auditoireIdValue.value.id);
        this.formData.append("anneeId", this.anneeIdValue.value.id);
        this.formData.append("files", this.file[0]); 
        console.log(this.formData);
        if (this.etudiant.id) {
          this.service.updateEtudiant(this.etudiant.id, this.formData).subscribe({
            next: (value) => {
              
            },
            complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 });  this.findAllEtu(); },
            error: (e) => {
              this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 }); this.findAllEtu();
            }
            
          })
        } else {
          
          this.service.addEtdudiant(this.formData).subscribe({
            next: (value) => {
              // window.location.reload();
              this.hideDialog();
            },
            complete: () => {
              this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Enregistrement avec succès', life: 3000 });
              this.findAllEtu();
              // window.location.reload();
              this.hideDialog();
            },
            error: (e) => {
              console.log(e);
              // window.location.reload();
              this.hideDialog();
            }
          });
        }
      } else {
        this.validateAllFields(this.etudiantForm)
      };
    }
    
    deleteSelected(id:any) {
      this.service.findEtuById(id)
      .subscribe({
        next: (response) => {
          this.etudiant = response;
          this.deleteDialog = true;
        },
        error: (response) => {
          console.log(response);
        }
      })
    }
    
    edit(id:any) {
      this.service.findEtuById(id)
      .subscribe({
        next: (response) => {
          this.etudiant = response;
          console.log(this.etudiant);
          this.etudiantDialog = true;
          this.etudiantForm.get("nom")?.patchValue(this.etudiant.nom);
          this.etudiantForm.get("postnom")?.patchValue(this.etudiant.postnom);
          this.etudiantForm.get("prenom")?.patchValue(this.etudiant.prenom);
          this.etudiantForm.get("genre")?.patchValue(this.etudiant.genre);
          this.etudiantForm.get("mail")?.patchValue(this.etudiant.mail);
          this.etudiantForm.get("photo")?.patchValue(this.etudiant.photo);
          this.etudiantForm.get("auditoireId")?.patchValue(this.etudiant.auditoireId);
          this.etudiantForm.get("contact")?.patchValue(this.etudiant.contact);
          
        },
        error: (response) => {
          console.log(response);
        }
      })
    }
    
    
    get nomValue() {
      return this.etudiantForm.get('nom')
    } 
    get postnomValue() {
      return this.etudiantForm.get('postnom')
    } 
    get prenomValue() {
      return this.etudiantForm.get('prenom')
    } 
    get genreValue() {
      return this.etudiantForm.get('genre')
    } 
    get contactValue() {
      return this.etudiantForm.get('contact')
    } 
    get mailValue() {
      return this.etudiantForm.get('mail')
    } 
    get photoValue() {
      return  this.etudiantForm.get('photo')
    } 
    get auditoireIdValue() {
      return this.etudiantForm.get('auditoireId')
    } 
    get anneeIdValue() {
      return this.etudiantForm.get('anneeId')
    } 
    
    delete(id: any) {
      this.service.deleteEtudiant(id)
      .subscribe({
        next: (response) => {
          
        },
        complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 }); this.findAllEtu(); },
        error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });  this.findAllEtu(); }
      });
    }
    
    findImage(code: any) {
      this.service.findImgById(code)
      .subscribe({
        next: (response) => {
          this.image = response;
        },
        complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 }); this.findAllEtu(); },
        error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });  this.findAllEtu(); }
      });
    }
    
    
    openNew() {
      this.etudiant = {};
      this.submitted = false;
      this.etudiantDialog = true;
    }
    
    
    hideDialog() {
      this.etudiantDialog = false;
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
  