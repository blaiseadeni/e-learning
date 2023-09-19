import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/breadcrumb.service';;
import { CoursService } from 'src/app/services/cours/cours.service';

@Component({
    selector: 'app-librairie',
    templateUrl: './librairie.component.html',
    styleUrls: ['./librairie.component.scss']
})
export class LibrairieComponent implements OnInit {
    
    cours: any = [];
    
    sortOptions: SelectItem[];
    
    sortOrder: number;
    
    sortField: string;
    
    
    sortKey: any
    
    constructor(private service: CoursService, private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'ISI-LIB' },
            { label: 'Librairie'}
        ]);
    }
    
    ngOnInit() {
        this.findAllCours();
    }
    
    onSortChange(event) {
        const value = event.value;
        
        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
    
    
    findAllCours() {
        this.service.findAllCours()
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
