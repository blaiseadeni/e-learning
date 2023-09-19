import { OrientationService } from './../../services/orientation/orientation.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/breadcrumb.service';

@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./orientation.component.scss']
})
export class OrientationComponent {
  
  options: any = [];
  
  site: any = {};
  sites: any = [];
  siteDialog: boolean = false;
  siteForm: FormGroup;
  
  orientations: any = [];
  orientation: any = {};
  orientationForm: FormGroup;
  orientationDialog: boolean = false;
  
  role: any;
  etudiant = "Etudiant";
  enseignant = "Enseignant";
  admin = "Admin";
  
  deleteDialog: boolean = false;
  
  submitted: boolean = false;
  
  cols: any[] = [];
  
  statuses: any[] = [];
  
  rowsPerPageOptions = [5, 10, 20];
  
  constructor(private service: OrientationService,
    private messageService: MessageService,
    private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        { label: 'ISI-ORIENT' },
        { label: 'Orientation' },
      ]);
    }
    
    ngOnInit() {
      
      this.role = localStorage.getItem('role');
      
      this.findAllOps();
      this.findAllOrientations();
      this.findAllSites();
      
      this.siteForm = new FormGroup({
        libelle: new FormControl('', Validators.required),
      })
      
      this.orientationForm = new FormGroup({
        siteId: new FormControl('', Validators.required),
        optionId: new FormControl('', Validators.required),
        libelle: new FormControl('', Validators.required),
      })
      
      this.cols = [
        {field: 'name', header: 'Name'},
        {field: 'price', header: 'Price'},
        {field: 'category', header: 'Category'},
        {field: 'rating', header: 'Reviews'},
        {field: 'inventoryStatus', header: 'Status'}
      ];      
    }
    
    
    openNew() {
      this.orientation = {};
      this.submitted = false;
      this.orientationDialog = true;
    }
    
    
    hideDialog() {
      this.orientationDialog = false;
      this.submitted = false;
    }
    openSite() {
      this.site = {};
      this.submitted = false;
      this.siteDialog = true;
    }
    
    
    hideSiteDialog() {
      this.siteDialog = false;
      this.submitted = false;
    }
    
    findAllOps() {
      this.service.findAllOps()
      .subscribe({
        next: (response) => {
          this.options = response;
          console.log(response);
        },
        error: (Response) => {
        }
      })
    }  
    
    findAllSites() {
      this.service.findAllSites()
      .subscribe({
        next: (response) => {
          this.sites = response;
          console.log(response);
        },
        error: (Response) => {
        }
      })
    }  
    
    findAllOrientations() {
      this.service.findAllOrs()
      .subscribe({
        next: (response) => {
          this.orientations = response;
          console.log(this.orientations);
        },
        error: (Response) => {
        }
      })
    }  
    
    addOrientation() {
      if (this.orientationForm.valid) {
        const request = {
          libelle: this.libelleValue.value,
          optionId: this.optionValue.value.id,
          siteId: this.siteValue.value.id,
        }
        if (this.orientation.id) {
          this.service.updateOr(this.orientation.id, request).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Success', life: 3000 });
            },
            complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 });  this.findAllOps(); this.findAllOrientations(); },
            error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });  this.findAllOps(); this.findAllOrientations();}
            
          })
        } else {
          
          this.service.addOr(request).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 });
            },
            complete: () => { this.messageService.add({ severity: 'danger', summary: 'Reussi', detail: ' Echec avec succès', life: 3000 });  this.findAllOps(); this.findAllOrientations(); },
            error: (e) => { this.messageService.add({ severity: 'danger', summary: 'Reussi', detail: 'Echec avec succès', life: 3000 });  this.findAllOps(); this.findAllOrientations(); }
            
          })
        }
      } else {
        this.validateAllFields(this.orientationForm)
      }
    }
    
    
    addSite() {
      const request = {
        libelle: this.libelleSite.value,
      }
      this.service.addSite(request).subscribe({
        next: (value) => {
          this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 });
        },
        complete: () => { this.messageService.add({ severity: 'danger', summary: 'Reussi', detail: ' Echec avec succès', life: 3000 });  this.findAllSites();},
        error: (e) => { this.messageService.add({ severity: 'danger', summary: 'Reussi', detail: 'Echec avec succès', life: 3000 });  this.findAllSites();}
      })
      this.siteDialog = false;
    }
    
    delete(id: any) {
      this.service.deleteOr(id)
      .subscribe({
        next: (response) => {
          
        },
        complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 }); this.findAllOps(); this.findAllOrientations(); },
        error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });  this.findAllOps(); this.findAllOrientations(); }
      });
    }
    
    
    deleteSelected(id:any) {
      this.service.findOrById(id)
      .subscribe({
        next: (response) => {
          this.orientation = response;
          this.deleteDialog = true;
        },
        error: (response) => {
          console.log(response);
        }
      })
    }
    
    edit(id:any) {
      this.service.findOrById(id)
      .subscribe({
        next: (response) => {
          this.orientation = response;
          this.orientationDialog = true;
          this.orientationForm.get("departementId")?.patchValue(this.orientation.optionId);
          this.orientationForm.get("siteId")?.patchValue(this.orientation.siteId);
          this.orientationForm.get("libelle")?.patchValue(this.orientation.libelle);
          
        },
        error: (response) => {
          console.log(response);
        }
      })
    }
    
    get libelleSite() {
      return this.siteForm.get('libelle')
    }
    get libelleValue() {
      return this.orientationForm.get('libelle')
    }
    
    get siteValue() {
      return this.orientationForm.get('siteId')
    }
    
    get optionValue() {
      return this.orientationForm.get('optionId')
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
  