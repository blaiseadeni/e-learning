import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { Product } from 'src/app/demo/domain/product';
import { EvenementService } from 'src/app/services/evenement/evenement.service';

@Component({
  selector: 'app-vacance',
  templateUrl: './vacance.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./vacance.component.scss']
})
export class VacanceComponent {
  
  productDialog: boolean = false;
  
  deleteProductDialog: boolean = false;
  
  deleteProductsDialog: boolean = false;
  
  products: Product[] = [];
  
  product: Product = {};
  
  selectedProducts: Product[] = [];
  
  submitted: boolean = false;
  
  cols: any[] = [];
  
  statuses: any[] = [];
  
  rowsPerPageOptions = [5, 10, 20];
  
  eventDialog: boolean = false;
  deleteDialog: boolean = false;
  
  evenements: any = [];
  evenement: any = {};
  
  evenForm: FormGroup;
  
  types: any[] = [];
  
  role: any;
  etudiant = "Etudiant";
  enseignant = "Enseignant";
  admin = "Admin";
  
  constructor(private service: EvenementService, private messageService: MessageService,public breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'Calendrier' },
      { label: 'Evenements', routerLink: [''] }
    ]);
  }
  
  ngOnInit() {
    
    this.role = localStorage.getItem('role');
    
    this.findAllEvents();
    
    this.evenForm = new FormGroup({
      libelle: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      dateEvent: new FormControl('', Validators.required),
      heureDebut: new FormControl('', Validators.required),
      heureFin: new FormControl('', Validators.required),
    })
    
    this.types = [
      { libelle: 'Sportive', value: 'Sportive' },
      { libelle: 'Culturelle', value: 'Culturelle' },
      { libelle: 'Autres', value: 'Autres' },
      
    ];
  }
  
  findAllEvents() {
    this.service.findAllEvents()
    .subscribe({
      next: (response) => {
        this.evenements = response;
        console.log(this.evenements);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }  
  
  add() {
    if (this.evenForm.valid) {
      const request = {
        libelle: this.libelleValue.value,
        type: this.typeValue.value.value,
        dateEvent: this.dateEventValue.value,
        heureDebut: this.heureDebutValue.value,
        heureFin: this.heureFinValue.value,
      }
      
      console.log(request);
      if (request.heureDebut.getTime() >= request.heureFin.getTime()) {
        this.messageService.add({ severity: 'error', summary: 'Info', detail: 'Heure invalid', life: 3000 });
      } else {
        this.service.addEvent(request).subscribe({
          next: (value) => {
            this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 });
            this.findAllEvents();
          },
          complete: () => {
            this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 });
            this.findAllEvents();
          },
          error: (err) => {
            this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 });
            this.findAllEvents();
          },
        }) 
      }
    } else {
      this.validateAllFields(this.evenForm)
    }
  }
  
  deleteSelected(id:any) {
    this.service.findEventById(id)
    .subscribe({
      next: (response) => {
        this.evenement = response;
        this.deleteDialog = true;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
  
  edit(id:any) {
    this.service.findEventById(id)
    .subscribe({
      next: (response) => {
        this.evenement = response;
        this.eventDialog = true;
        this.evenForm.get("libelle")?.patchValue(this.evenement.libelle);
        this.evenForm.get("type")?.patchValue(this.evenement.type);
        this.evenForm.get("dateEvent")?.patchValue(this.evenement.dateEvent);
        this.evenForm.get("heureDebut")?.patchValue(this.evenement.heureDebut);
        this.evenForm.get("heureFin")?.patchValue(this.evenement.heureFin);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
  
  get libelleValue() {
    return this.evenForm.get('libelle')
  }
  
  get typeValue() {
    return this.evenForm.get('type')
  }
  
  get dateEventValue() {
    return this.evenForm.get('dateEvent')
  }
  
  get heureDebutValue() {
    return this.evenForm.get('heureDebut')
  }
  
  get heureFinValue() {
    return this.evenForm.get('heureFin')
  }
  
  open() {
    this.eventDialog = true;
  }
  
  hide() {
    this.eventDialog = false;
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
