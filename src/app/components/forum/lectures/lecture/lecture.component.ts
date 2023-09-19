import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from 'src/app/services/forum/forum.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./lecture.component.scss']
})
export class LectureComponent {
  text: string;
  forum: any;
  responses: any;
  reponse: any = {};
  id:  any;
  
  constructor(private messageService: MessageService,private service: ForumService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.getForum();
    this.getReponse();
  }
  
  add() {
    const request = {
      contenu: this.reponse.contenu,
      forumId: this.id,
    }
    this.service.addResponse(request).subscribe({
      next: (value) => {
        this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Enregistrer avec succès', life: 3000 });
        this.getReponse();
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Enregistrer avec succès', life: 3000 });
        this.getReponse();
      },
      error: (err) => {
        this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Enregistrer avec succès', life: 3000 });
        this.getReponse();
      },
    })
  }
  getForum(){
    this.route.paramMap.subscribe({
      next: (params) =>{
        const id = params.get('id');
        this.id = id;
        if (id) {
          this.service.findForumById(id)
          .subscribe({
            next: (response) =>{
              this.forum = response;
              console.log(this.forum);
              
            }
          })
        }
      }
    })
  }
  
  getReponse(){
    this.route.paramMap.subscribe({
      next: (params) =>{
        const id = params.get('id');
        if (id) {
          this.service.findResponseById(id)
          .subscribe({
            next: (response) =>{
              this.responses = response;
              console.log(this.responses);
              
            }
          })
        }
      }
    })
  }
  
}
