import { DepartementService } from './../../services/departement/departement.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { request } from 'http';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent {
  
  sectionDialog: boolean = false;
  sections: any = [];
  section: any = {}
  sectionForm: FormGroup;
  
  departements: any = [];
  departement: any = {};
  departementForm: FormGroup;
  departementDialog: boolean = false;
  
  
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  
  
  
  submitted: boolean = false;
  
  cols: any[] = [];
  
  statuses: any[] = [];
  
  rowsPerPageOptions = [5, 10, 20];
  
  constructor(private depsService: DepartementService,
    private messageService: MessageService,
    private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        { label: 'Configurations' },
        { label: 'Departement' },
      ]);
    }
    
    ngOnInit() {
      
      this.findAllSections();
      this.findAllDeps();
      
      this.sectionForm = new FormGroup({
        designation: new FormControl('', Validators.required),
      })
      
      this.departementForm = new FormGroup({
      //  dateC: new FormControl('', Validators.required),
        sectionId: new FormControl('', Validators.required),
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
    
    openSection() {
      this.section = {};
      this.submitted = false;
      this.sectionDialog = true;
    }
    
    openNew() {
      this.departement = {};
      this.submitted = false;
      this.departementDialog = true;
    }
    
    hideSection() {
      this.sectionDialog = false;
      this.submitted = false;
    }
    
    hideDialog() {
      this.departementDialog = false;
      this.submitted = false;
    }
    
    findAllSections() {
      this.depsService.findAllSections()
      .subscribe({
        next: (response) => {
          this.sections = response;
          // console.log(response);
        },
        error: (Response) => {
        }
      })
    }  
    
    findAllDeps() {
      this.depsService.findAllDeps()
      .subscribe({
        next: (response) => {
          this.departements = response;
          // console.log(response);
        },
        error: (Response) => {
        }
      })
    }  
    
    addSection() {
      if (this.sectionForm.valid) {
        const request = {
          libelle: this.designationValue.value,
        }
        this.depsService.addSection(request).subscribe({
          next: (value) => {
            this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 });
            this.findAllSections();
          },
          complete: () => {
            this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 });
            this.findAllSections();
          },
          error: (err) => {
            this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 });
            this.findAllSections();
          },
        })
        this.validateAllFields(this.sectionForm)
      }
      this.section = { ...this.section };
      this.sectionDialog = false;
    }
    
    addDep() {
      if (this.departementForm.valid) {
        const request = {
          libelle: this.libelleValue.value,
          sectionId: this.sectionValue.value.id,
        //  dateC: this.dateValue.value
        }
        console.log(request);
        if (this.departement.id) {
          this.depsService.updateDep(this.departement.id, request).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Success', life: 3000 });
            },
            complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Enregistrement avec succès', life: 3000 }); this.findAllDeps(); },
            error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Enregistrement avec succès', life: 3000 }); this.findAllDeps(); }
            
          })
        } else {
          this.depsService.addDep(request).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 });
            },
            complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Enregistrement avec succès', life: 3000 }); this.findAllDeps(); },
            error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Enregistrement avec succès', life: 3000 }); this.findAllDeps();}
            
          })
        }
      } else {
        this.validateAllFields(this.departementForm)
      }
    }
    
    get designationValue() {
      return this.sectionForm.get('designation')
    }
    
    get libelleValue() {
      return this.departementForm.get('libelle')
    }
    
    // get dateValue() {
    //   return this.departementForm.get('dateC')
    // }
    
    get sectionValue() {
      return this.departementForm.get('sectionId')
    }
    
    delete(id: any) {
      this.depsService.deleteDep(id)
      .subscribe({
        next: (response) => {
          
        },
        complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Enregistrement avec succès', life: 3000 }); this.findAllDeps(); },
        error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Enregistrement avec succès', life: 3000 }); this.findAllDeps(); }
      });
    }
    
    edit(departement: any) {
      this.departement = { ...departement };
      this.departementDialog = true;
      console.log(this.departement);
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
    
    deleteSelectedProducts() {
      this.deleteProductsDialog = true;
    }
    
    
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
  }
  