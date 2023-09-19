import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table/public_api';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { EnseignantService } from 'src/app/services/enseignant/enseignant.service';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./enseignant.component.scss']
})
export class EnseignantComponent {
  
  image_url: any;
  
  file?: File;
  
  sexes: any = [];
  
  niveaux: any = [];
  
  enseignantForm: FormGroup;
  enseignant: any = {};
  enseignants: any = [];
  enseignantDialog: boolean = false;
  deleteDialog: boolean = false;
  
  submitted: boolean = false;
  
  cols: any[] = [];
  
  rowsPerPageOptions = [5, 10, 20];
  
  frm!:FormGroup;
  imageFile?:File;
  
  role: any;
  etudiant = "Etudiant";
  enseignantR = "Enseignant";
  admin = "Admin";
  
  
  constructor(private service: EnseignantService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        { label: 'Configurations' },
        { label: 'Enseignant' },
      ]);
    }
    
    ngOnInit() {
      
      this.role = localStorage.getItem('role');
      
      this.findAllEns();
      
      this.enseignantForm = new FormGroup({
        nom: new FormControl('', Validators.required),
        postnom: new FormControl('', Validators.required),
        prenom: new FormControl('', Validators.required),
        genre: new FormControl('', Validators.required),
        grade: new FormControl('', Validators.required),
        contact: new FormControl('', Validators.required),
        mail: new FormControl('', Validators.required),
        file: new FormControl(''),
      })
      
      this.sexes = [
        { label: 'Féminin', value: 'feminin' },
        { label: 'Masculin', value: 'masculin' }
      ];
      
      this.niveaux = [
        { label: 'Licencié', value: 'licencié' },
        { label: 'Master', value: 'master' },
        { label: 'Doctorant', value: 'doctorant' },
        { label: 'Professeur', value: 'professeur' }
      ];
      
    }
    
    onImageChanged(files) {
      
      if (files.length === 0) {
        return;
      }
      
      let mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        console.log('Only images are supported.');
        return;
      }
      
      let reader = new FileReader();
      this.file = files;
      reader.onload = () => {
        this.image_url = reader.result;
      };
      reader.readAsDataURL(this.file[0]);
      
    }
    
    addEnseignant() {
      if (this.enseignantForm.valid) {
        let formData:FormData = new FormData();  
        formData.append('nom',this.nomValue.value);  
        formData.append('postnom', this.postnomValue.value);  
        formData.append('prenom',this.prenomValue.value);  
        formData.append('genre',this.genreValue.value.value); 
        formData.append('grade',this.niveauValue.value.value); 
        formData.append('contact',this.contactValue.value); 
        formData.append('mail',this.mailValue.value); 
        formData.append('file', this.file[0]); 
        if (this.enseignant.id) {
          this.service.updateEnseignant(this.enseignant.id, formData).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Success', life: 3000 }); this.findAllEns(); this.hideDialog();
            },
            complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Modification avec succès', life: 3000 }); this.findAllEns(); this.hideDialog(); },
            error: (e) => {
              console.log(e);
            }
            
          })
        } else {
          this.service.addEnseignant(formData).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 }); this.findAllEns(); this.hideDialog();
            },
            complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Enregistrement avec succès', life: 3000 }); this.findAllEns(); this.hideDialog(); },
            error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Enregistrement avec succès', life: 3000 }); this.findAllEns(); this.hideDialog();  }
            
          })
        }
      } else {
        this.validateAllFields(this.enseignantForm)
      };
    }
    
    deleteSelected(id:any) {
      this.service.findEnsById(id)
      .subscribe({
        next: (response) => {
          this.enseignant = response;
          this.deleteDialog = true;
        },
        error: (response) => {
          console.log(response);
        }
      })
    }
    
    
    
    edit(id: any) {
      this.service.findEnsById(id)
      .subscribe({
        next: (response) => {
          this.enseignant = response;
          this.enseignantDialog = true;
          this.enseignantForm.get("nom")?.patchValue(this.enseignant.nom);
          this.enseignantForm.get("postnom")?.patchValue(this.enseignant.postnom);
          this.enseignantForm.get("prenom")?.patchValue(this.enseignant.prenom);
          this.enseignantForm.get("contact")?.patchValue(this.enseignant.contact);
          this.enseignantForm.get("mail")?.patchValue(this.enseignant.mail);
          this.enseignantForm.get("grade")?.patchValue(this.enseignant.grade);
        },
      });
      
    }
    get nomValue() {
      return this.enseignantForm.get('nom')
    } 
    get postnomValue() {
      return this.enseignantForm.get('postnom')
    } 
    get prenomValue() {
      return this.enseignantForm.get('prenom')
    } 
    get genreValue() {
      return this.enseignantForm.get('genre')
    } 
    get contactValue() {
      return this.enseignantForm.get('contact')
    } 
    get mailValue() {
      return this.enseignantForm.get('mail')
    } 
    get photoValue() {
      return this.enseignantForm.get('file')
    } 
    get niveauValue() {
      return this.enseignantForm.get('grade')
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
    
    delete(id: any) {
      this.service.deleteEnseignant(id)
      .subscribe({
        next: (response) => {
          
        },
        complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 }); this.findAllEns(); },
        error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });  this.findAllEns(); }
      });
    } 
    
    openNew() {
      this.enseignant = {};
      this.submitted = false;
      this.enseignantDialog = true;
    }
    
    
    hideDialog() {
      this.enseignantDialog = false;
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
  