import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent {
  declare WooClap: any;
  
   constructor() { }
  
  ngOnInit(): void {
  
  }
  
}
