import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addDays } from '@fullcalendar/core/internal';
import { time } from 'console';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { CoursService } from 'src/app/services/cours/cours.service';
import { WelcomeService } from 'src/app/services/welcome/welcome.service';

@Component({
  selector: 'app-welcome-live',
  templateUrl: './welcome-live.component.html',
  
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./welcome-live.component.scss']
})
export class WelcomeLiveComponent implements OnInit {
  
  auditoires: any = [];
  
  cours: any = [];
  
  live: any = {};
  /**
  *
  */
  constructor(
    
    private messageService: MessageService,
    private liveService: WelcomeService,
    private router: Router,
    private service: CoursService,
    private breadcrumbService: BreadcrumbService
    )
    { 
      this.breadcrumbService.setItems([
        { label: 'ISI-LIVE' },
        { label: 'Live' },
      ]);
    }
    
    ngOnInit(): void {
      this.findAllCours();
    }
    
    addLive() {
      const request = {
        auditoireId: this.live.auditoireId.id,
        libelle: this.live.libelle.titre,
        date: this.live.date,
        heureDebut: this.live.heureDebut,
        heureFin: this.live.heureFin,
        description: this.live.description
      }      
      let today = new Date();
      let yesterday = new Date();
      let dayOfMoth = today.getDate();
      let toDay = yesterday.setDate(dayOfMoth - 1);
      if (request.date < toDay) {
        this.messageService.add({ severity: 'error', summary: 'Success', detail: 'Date invalid', life: 3000 });
      } else if (request.heureDebut < Date.now()) { 
        this.messageService.add({ severity: 'error', summary: 'Success', detail: 'Heure invalid', life: 3000 });
      } else if (request.heureDebut > request.heureFin) {
        this.messageService.add({ severity: 'error', summary: 'Success', detail: 'Heure debut doit être inferieur à celle de fin', life: 3000 });
      } else {
        this.liveService.addLive(request).subscribe({
          next: (value) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Live créer avec succès', life: 3000 });
          },
          complete: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Live créer avec succès', life: 3000 });
            this.router.navigate(['conference/live'])
          },
          error: (e) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Live créer succès', life: 3000 });
            this.router.navigate(['conference/live']);
          }
        })
      }
    }
    
    findAllCours() {
      this.service.findAllAud()
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
    
    findCours(event:any) {
      this.service.findCoursByAudi(event.value.id)
      .subscribe({
        next: (response) => {
          this.cours = response;
          console.log(this.cours);
        },
        error: (response) => {
          console.log(response);
        }
      })
    }
    
  }
  