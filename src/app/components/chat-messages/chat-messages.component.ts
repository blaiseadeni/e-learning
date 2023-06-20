import { Component } from '@angular/core';

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
  styleUrls: ['./chat-messages.component.scss']
})


export class ChatMessagesComponent {
  items: Item[] = [];
  datas: Data[] = [];
  
  ngOnInit(): void {
    for (let i = 0; i < 11; i++) {
      this.items.push({ label: 'Item #' + i, index: i });
    }
    for (let i = 0; i < 11; i++) {
      this.datas.push({ label: 'Item #' + i, index: i });
    }
  }
  
}
