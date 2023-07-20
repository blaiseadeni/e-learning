import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { parse } from 'path';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { EtudiantService } from 'src/app/services/etudiant/etudiant.service';


@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./etudiant.component.scss']
})


export class EtudiantComponent {
  
  image_url: any;
  
  file?:File;
  
  sexes: any = [];
  
  auditoires: any = [];
  
  etudiantForm: FormGroup;
  etudiant: any = {};
  etudiants: any = [];
  etudiantDialog: boolean = false;
  
  submitted: boolean = false;
  
  cols: any[] = [];
  
  rowsPerPageOptions = [5, 10, 20];
  
  constructor(private messageService: MessageService,
    private service: EtudiantService,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        { label: 'Etudiant' },
      ]);
    }
    
    ngOnInit() {
      this.etudiantForm = new FormGroup({
        nom: new FormControl('', Validators.required),
        postnom: new FormControl('', Validators.required),
        prenom: new FormControl('', Validators.required),
        genre: new FormControl('', Validators.required),
        contact: new FormControl('', Validators.required),
        mail: new FormControl('', Validators.required),
        file: new FormControl([]),
        auditoireId: new FormControl('', Validators.required),
      })
      
      this.sexes = [
        { label: 'Féminin', value: 'feminin' },
        { label: 'Masculin', value: 'masculin' }
      ];
      
      this.findAllAudi();
      this.findAllEtu();
      
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
    
    
    findAllAudi() {
      this.service.findAllAudi()
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
        const request = {
          nom: this.nomValue.value,
          postnom: this.postnomValue.value,
          prenom: this.prenomValue.value,
          genre: this.genreValue.value.value,
          contact: this.contactValue.value,
          mail: this.mailValue.value,
          //file:  this.file,
          auditoireId: this.auditoireIdValue.value.id,
        }
        if (this.etudiant.id) {
          this.service.updateEtudiant(this.etudiant.id, request).subscribe({
            next: (value) => {
              
            },
            complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 });  this.findAllEtu(); },
            error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });  this.findAllEtu();}
            
          })
        } else {
          const frmData:any= Object.assign(request);
          frmData.file=this.file;
          console.log(frmData);
          this.service.addEtdudiant(frmData).subscribe({
            next: (value) => {
              
            },
            complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Enregistrement avec succès', life: 3000 }); this.findAllEtu(); },
            error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Enregistrement avec succès', life: 3000 }); this.findAllEtu(); }
          });
        }
      } else {
        this.validateAllFields(this.etudiantForm)
      };
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
    
    delete(id: any) {
      this.service.deleteEtudiant(id)
      .subscribe({
        next: (response) => {
          
        },
        complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 }); this.findAllEtu(); },
        error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });  this.findAllEtu(); }
      });
    }
    
    
    edit(etudiant: any) {
      this.etudiant = { ...etudiant };
      this.etudiantDialog = true;
      console.log(this.etudiant);
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
  