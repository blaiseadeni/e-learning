import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/services/cours/cours.service';
import { LibrairieService } from 'src/app/services/librairie/librairie.service';

@Component({
  selector: 'app-lib-lecture',
  templateUrl: './lib-lecture.component.html',
  styleUrls: ['./lib-lecture.component.scss']
})
export class LibLectureComponent implements OnInit{
  text: string;
  
  cours: any = {};
  /**
  *
  */
  constructor(private service: LibrairieService,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.getCours();
  }
  
  
  getCours(){
    this.route.paramMap.subscribe({
      next: (params) =>{
        const id = params.get('id');
        console.log(id);
        if (id) {
          this.service.findCoursById(id)
          .subscribe({
            next: (response) =>{
              this.cours = response;
              console.log(this.cours);
              
            }
          })
        }
      }
    })
  }
  
}
