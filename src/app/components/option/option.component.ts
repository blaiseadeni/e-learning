import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { DepartementService } from './../../services/departement/departement.service';
import { OptionService } from 'src/app/services/option/option.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./option.component.scss']
})
export class OptionComponent {
  
  departements: any = [];
  
  option: any = {};
  options: any = []
  optionForm: FormGroup;
  optionDialog: boolean = false;
  
  
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  
  
  
  submitted: boolean = false;
  
  cols: any[] = [];
  
  statuses: any[] = [];
  
  rowsPerPageOptions = [5, 10, 20];
  
  constructor(private service: OptionService,
    private messageService: MessageService,
    private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        { label: 'Configurations' },
        { label: 'Optio' },
      ]);
    }
    
    ngOnInit() {
      this.findAllDeps();
      this.findAllOptions();
      this.optionForm = new FormGroup({
        departementId: new FormControl('', Validators.required),
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
      this.option = {};
      this.submitted = false;
      this.optionDialog = true;
    }
    
    
    hideDialog() {
      this.optionDialog = false;
      this.submitted = false;
    }
    
    findAllDeps() {
      this.service.findAllDeps()
      .subscribe({
        next: (response) => {
          this.departements = response;
          // console.log(response);
        },
        error: (Response) => {
        }
      })
    }  
    
    findAllOptions() {
      this.service.findAllOptions()
      .subscribe({
        next: (response) => {
          this.options = response;
          console.log(response);
        },
        error: (Response) => {
        }
      })
    }  
    
    addOp() {
      if (this.optionForm.valid) {
        const request = {
          libelle: this.libelleValue.value,
          departementId: this.departementValue.value.id,
        }
        if (this.option.id) {
          this.service.updateOption(this.option.id, request).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Success', life: 3000 });
            },
            complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 }); this.findAllDeps(); this.findAllOptions() },
            error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 }); this.findAllDeps(); this.findAllOptions()}
            
          })
        } else {
          this.service.addOption(request).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 });
            },
            complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 }); this.findAllDeps(); this.findAllOptions(); },
            error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 }); this.findAllDeps(); this.findAllOptions(); }
            
          })
        }
      } else {
        this.validateAllFields(this.optionForm)
      }
    }
    
    delete(id: any) {
      this.service.deleteOption(id)
      .subscribe({
        next: (response) => {
          
        },
        complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 }); this.findAllDeps(); },
        error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 }); this.findAllDeps(); }
      });
    }
    
    edit(option: any) {
      this.option = { ...option };
      this.optionDialog = true;
      console.log(this.option);
    }
    
    
    
    
    get libelleValue() {
      return this.optionForm.get('libelle')
    }
    
    
    get departementValue() {
      return this.optionForm.get('departementId')
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
  