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
  messages: any = [];
  /**
  *
  */
  constructor(
    private service: EtudiantService,
    private chatService: ChatService,
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
    
    myMessages(id:any) {
      this.chatService.findAllReceiver(id)
      .subscribe({
        next: (response) => {
          this.messages = response;
          
        }
      })
    }
  
}
