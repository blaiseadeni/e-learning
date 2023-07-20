import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { Product } from 'src/app/demo/domain/product';
import { PromotionService } from 'src/app/services/promotion/promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent {
  
  promotion: any = {};
  promotions: any = [];
  promotionDialog: boolean = false;
  promotionForm: FormGroup;
  
  auditoireDialog: boolean = false;
  auditoire: any = {};
  auditoires: any = [];
  auditoireForm: FormGroup;
  
  orientations: any = [];
  
  deleteProductDialog: boolean = false;
  
  deleteProductsDialog: boolean = false;
  
  selectedProducts: Product[] = [];
  
  submitted: boolean = false;
  
  cols: any[] = [];
  
  rowsPerPageOptions = [5, 10, 20];
  
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService,
    private service: PromotionService) {
      this.breadcrumbService.setItems([
        { label: 'Promotion' },
      ]);
    }
    
    ngOnInit() {
      
      this.auditoireForm = new FormGroup({
        libelle: new FormControl('', Validators.required),
        promotionId: new FormControl('', Validators.required),
        orientationId: new FormControl('', Validators.required),
      })
      
      this.promotionForm = new FormGroup({
        libelle: new FormControl('', Validators.required),
      })
      
      
      this.findAllOrients();
      this.findAllAudi();
      this.findAllPromo();
      
      this.cols = [
        { field: 'name', header: 'Name' },
        { field: 'price', header: 'Price' },
        { field: 'category', header: 'Category' },
        { field: 'rating', header: 'Reviews' },
        { field: 'inventoryStatus', header: 'Status' }
      ];
      
    }
    
    findAllOrients() {
      this.service.findAllOrient()
      .subscribe({
        next: (response) => {
          this.orientations = response;
          // console.log(this.orientations);
        },
        error: (response) => {
          console.log(response);
        }
      })
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
    
    findAllPromo() {
      this.service.findAllPromo()
      .subscribe({
        next: (response) => {
          this.promotions = response;
          // console.log(this.promotions);
        },
        error: (response) => {
          console.log(response);
        }
      })
    }  
    
    addAudi() {
      if (this.auditoireForm.valid) {
        const request = {
          libelle: this.libelleAudiValue.value,
          promotionId: this.promotionIdValue.value.id,
          orientationId: this.orientationIdValue.value.id,
        }
        if (this.auditoire.id) {
          this.service.updateAudi(this.auditoire.id, request).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Success', life: 3000 }); this.findAllAudi();
            },
            complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Enregistrement avec succès', life: 3000 }); this.findAllAudi; },
            error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Enregistrerment avec succès', life: 3000 }); this.findAllAudi; }
            
          })
        } else {
          this.service.addAudi(request).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 }); this.findAllAudi(); },
            complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Enregistrement avec succès', life: 3000 }); this.findAllAudi();  },
            error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Enregistrement avec succès', life: 3000 }); this.findAllAudi; }
            
          })
        }
      } else {
        this.validateAllFields(this.auditoireForm)
      }
    }
    
    
    addPromo() {
      const request = {
        libelle: this.libellePromoValue.value,
      }
      this.service.addPromo(request).subscribe({
        next: (value) => {
          this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 });
        },
        complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 });  this.findAllPromo();},
        error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });  this.findAllPromo();}
        
      })
      this.promotions = [...this.promotions];
      this.promotionDialog = false;
      this.promotion = {};
    }
    
    delete(id: any) {
      this.service.deleteAudi(id)
      .subscribe({
        next: (response) => {
          
        },
        complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 }); this.findAllAudi(); },
        error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });  this.findAllAudi(); }
      });
    }
    
    
    edit(auditoire: any) {
      this.auditoire = { ...auditoire };
      this.auditoireDialog = true;
      console.log(this.auditoire);
    }
    
    
    get libellePromoValue() {
      return this.promotionForm.get('libelle')
    }  
    
    get orientationIdValue() {
      return this.auditoireForm.get('orientationId')
    } 
    
    get promotionIdValue() {
      return this.auditoireForm.get('promotionId')
    }  
    
    get libelleAudiValue() {
      return this.auditoireForm.get('libelle')
    }  
    
    openAuditoire() {
      this.auditoire = {};
      this.submitted = false;
      this.auditoireDialog = true;
    }
    
    openPromotion() {
      this.promotion = {};
      this.submitted = false;
      this.promotionDialog = true;
    }
    hideDialog() {
      this.auditoireDialog = false;
      this.submitted = false;
    }
    
    
    hidePromoDialog() {
      this.promotionDialog = false;
      this.submitted = false;
    }
    
    
    deleteSelectedProducts() {
      this.deleteProductsDialog = true;
    }
    
    editPromotion(promotion: any) {
      this.promotion = { ...promotion };
      this.promotionDialog = true;
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
  