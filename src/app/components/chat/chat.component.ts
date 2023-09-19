import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat.service';
import { EtudiantService } from 'src/app/services/etudiant/etudiant.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  
  etudiants: any = [];
  /**
  *
  */
  constructor(
    private service: EtudiantService,
    ) { }
    
    
    ngOnInit(): void {
      this.findAllEtu();
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
    
    
    
  }
  