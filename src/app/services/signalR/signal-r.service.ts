import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'; 

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: any = [];
  private hubConnection: signalR.HubConnection;
  
  constructor() { }
  
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7085/chat/')
    .build();
    
    this.hubConnection.start().then(() => console.log('Connection started'))
    .catch(err => console.log('err while starting connection', + err))
  }
  
  public addTransfer = () => {
    this.hubConnection.on('transfer', (data) => {
      this.data = data;
      console.log("Signal r data",data);
    })
  }
  
}
