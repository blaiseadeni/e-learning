import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ChatService } from 'src/app/services/chat/chat.service';
import { environment } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr'; 
import { HttpHeaders } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { SignalRService } from 'src/app/services/signalR/signal-r.service';

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
  author: any;
  messages: any = [];
  tableauFinal: any = [];
  sendTo: any = [];
  message: any = {};
  private connection: HubConnection;
  baseApiUrl: string = 'https://localhost:7085/notify';
  
  
  /**
  *
  */
  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public signalRService: SignalRService
    ) {
      // this.connection = new HubConnectionBuilder()
      // .withUrl('https://localhost:7085/notify')
      // .build();
    }
    
    async ngOnInit(): Promise<void> {
      this.etudiantId = localStorage.getItem('etudiantId');
      this.findAllAuthor(); 
      this.findAllRec(); 
      this.findEtu();
      
      // this.signalRService.startConnection();
      // this.signalRService.addTransfer();
      this.findAll();
      
      
      // try {
      //   await this.connection.start();
      //   console.log('Connected to SignalR hub');
      // } catch (error) {
      //   console.error('Failed to connect to SignalR hub', error);
      // }
      
      this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.baseApiUrl + "chat").build();
      
      this.connection.start().then(function () {
        console.log('SignalR connected');
      }).catch(function (err) {
        return console.error(err.toString());
      });
      
      this.connection.on("transfer", () => { 
        console.log("Hey, friend as been notified");
        this.findAll();
      })
    }
    
    findAll() {
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
            this.chatService.findAll(users)
            .subscribe({
              next: (response) => {
                this.tableauFinal = response;
                // console.log(this.tableauFinal);
              }
            })
          }
        }
      })
    }
    
    findAllAuthor() {
      this.route.paramMap.subscribe({
        next: (params) =>{
          const id = params.get('id');
          this.author = params.get('id');
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
                // console.log(this.etudiant);
              }
            })
          }
        }
      })
    }
    
    
    send() {
      this.chatService.sendMessage(this.message).subscribe({
        next: async (value) => {
          this.findAllRec();
          this.findAllAuthor();
          this.findAll();
          await this.connection.invoke('Send', this.message);
          this.message = '';
        },
        complete: async () => {
          this.findAllRec();
          this.findAllAuthor();
          this.findAll();
          await this.connection.invoke('Send', this.message);
          this.message = '';
          
        },
        error: (e) => {
          this.findAllRec();
          this.findAllAuthor();
          this.findAll();
          this.message = '';
          
        }
      })
    }    
  }
  