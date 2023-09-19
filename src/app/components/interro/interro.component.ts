import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { ExamenService } from 'src/app/services/examen/examen.service';

@Component({
  selector: 'app-interro',
  templateUrl: './interro.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./interro.component.scss']
})
export class InterroComponent implements OnInit{
  
  
  examens: any = [];
  
  submitted: boolean = false;
  
  cols: any[] = [];
  
  statuses: any[] = [];
  
  rowsPerPageOptions = [5, 10, 20];
  
  role: any;
  etudiant = "Etudiant";
  enseignant = "Enseignant";
  admin = "Admin";

  constructor(
    private messageService: MessageService,
    private service: ExamenService,
    private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        { label: 'ISI-TEST' },
        { label: 'Test' },
      ]);
    }
    
  ngOnInit() {

       this.role = localStorage.getItem('role');
      this.findAll();
      
      this.statuses = [
        { label: 'En entente', value: 'En entente' },
        { label: 'Encours', value: 'Encours' },
        { label: 'Terminé', value: 'Terminé' }
      ];
      
    }
    
    findAll() {
      this.service.findAllQuizes()
      .subscribe({
        next: (response) => {
          this.examens = response;
          // console.log(response);
        },
        error: (Response) => {
        }
      })
    }  
    
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
  }
  