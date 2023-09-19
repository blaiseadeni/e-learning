import { Component } from '@angular/core';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
// @fullcalendar plugins
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table/public_api';
import { EvenementService } from 'src/app/services/evenement/evenement.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./evenement.component.scss']
})
export class EvenementComponent {
  
  eventDialog: boolean;
  
  evenements: any = [];
  
  evenForm: FormGroup;
  
  
  
  constructor(private service: EvenementService, private messageService: MessageService,public breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'Calendrier' },
      { label: 'Evenements', routerLink: [''] }
    ]);
  }
  
  ngOnInit() {
    
    
    this.findAllEvents();
    
    this.evenForm = new FormGroup({
      libelle: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      dateEvent: new FormControl('', Validators.required),
      heureDebut: new FormControl('', Validators.required),
      heureFin: new FormControl('', Validators.required),
    })
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
        type: this.typeValue.value,
        dateEvent: this.dateEventValue.value,
        heureDebut: this.heureDebutValue.value.id,
        heureFin: this.heureFinValue.value,
      }
      
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
      this.validateAllFields(this.evenForm)
    }
    this.eventDialog = false;
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
    return this.evenForm.get('heureDebut')
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
