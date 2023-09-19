import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ChatService } from 'src/app/services/chat/chat.service';

interface Item {
  label: string;
  index: number;
}
interface Data {
  label: string;
  index: number;
}

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
  providers:[MessageService]
})


export class ChatMessagesComponent {
  
  etudiantId: any;
  etudiant: any;
  messages: any = [];
  sendTo: any = [];
  message: any = {};
  
  /**
  *
  */
  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private messageService: MessageService
    ) {}
    
    ngOnInit(): void {
      this.etudiantId = localStorage.getItem('etudiantId');
      this.findAllAuthor(); 
      this.findAllRec(); 
      this.findEtu();
      
    }
    
    findAllAuthor() {
      this.route.paramMap.subscribe({
        next: (params) =>{
          const id = params.get('id');
          if (id) {
            this.message.sendTo = id;
            this.message.author = this.etudiantId;
            const users = {
              author: id,
              sendTo: this.etudiantId
            };
            this.chatService.findAllAuthor(users)
            .subscribe({
              next: (response) => {
                this.messages = response;
                console.log(this.messages);
              }
            })
          }
        }
      })
    }
    
    findAllRec() {
      this.route.paramMap.subscribe({
        next: (params) =>{
          const id = params.get('id');
          if (id) {
            this.message.sendTo = id;
            this.message.author = this.etudiantId;
            const users = {
              author: id,
              sendTo: this.etudiantId
            };
            this.chatService.findAllReceiver(users)
            .subscribe({
              next: (response) => {
                this.sendTo = response;
                console.log(this.sendTo);
              }
            })
          }
        }
      })
    }
    
    
    
    findEtu() {
      this.route.paramMap.subscribe({
        next: (params) =>{
          const id = params.get('id');
          if (id) {
            this.chatService.findStudentById(id)
            .subscribe({
              next: (response) => {
                this.etudiant = response;
                console.log(this.etudiant);
              }
            })
          }
        }
      })
    }
    
    
    send() {
      this.chatService.sendMessage(this.message).subscribe({
        next: (value) => {
          this.findAllRec();
          this.findAllAuthor();
          this.message = '';
        },
        complete: () => {
          this.findAllRec();
          this.findAllAuthor();
          this.message = '';
          
        },
        error: (e) => {
          this.findAllRec();
          this.findAllAuthor();
          this.message = '';
          
        }
      })
    }    
  }
  