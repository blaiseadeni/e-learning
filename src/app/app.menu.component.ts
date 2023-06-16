import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    
    model: any[];
    
    constructor(public appMain: AppMainComponent) {}
    
    ngOnInit() {
        this.model = [
            { label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/'],
            items: [
                { label: 'Administrateurs', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin'] },
                { label: 'Enseignants', icon: 'pi pi-fw pi-paypal', routerLink: ['/teacher'] },
                { label: 'Etudiants', icon: 'pi pi-fw pi-user ', routerLink: ['/student'] },
                
            ]
        },
        {
            label: 'Configurations', icon: 'pi pi-fw pi-cog', routerLink: [''],
            items: [
                {label: 'Départements', icon: 'pi pi-fw pi-id-card', routerLink: ['/configuration/departement']},
                {label: 'Promotions', icon: 'pi pi-fw pi-paypal', routerLink: ['/configuration/promotion']},
                {label: 'Enseignants', icon: 'pi pi-fw pi-user ', routerLink: ['/configuration/enseignant']},
                {label: 'Cours', icon: 'pi pi-fw pi-file-pdf', routerLink: ['/configuration/cours']},
                {label: 'Etudiants', icon: 'pi pi-fw pi-users', routerLink: ['/configuration/etudiant']},
                {label: 'Librairie', icon: 'pi pi-fw pi-book', routerLink: ['/configuration/librairie'], class: 'rotated-icon'},
                
            ]
        },
        {
            label: 'Evaluations', icon: 'pi pi-fw pi-file', routerLink: [''],
            items: [
                {label: 'Créer', icon: 'pi pi-fw pi-circle-fill', routerLink: ['/evaluation/examen']},
                // {label: 'Epreuves', icon: 'pi pi-fw pi-stop-circle', routerLink: ['/evaluation/td']},
                // {label: 'Travail pratique', icon: 'pi pi-fw pi-spinner', routerLink: ['/evaluation/tp']},
                {label: 'Liste', icon: 'pi pi-fw pi-stop-circle', routerLink: ['/evaluation/interro']},
            ]
        },
        {
            label: 'Conférence', icon: 'pi pi-fw pi-desktop', routerLink: [''],
            items: [
                {label: 'Direct', icon: 'pi pi-fw pi-video', routerLink: ['/conference/welcome-live']},
                {label: 'Forum', icon: 'pi pi-fw pi-comments',  routerLink: ['/conference/forum']},
                {label: 'Vidéos', icon: 'pi pi-fw pi-youtube', routerLink: ['/conference/video']},
                {label: 'Groupes', icon: 'pi pi-fw pi-users', routerLink: ['/conference/groupe']},
            ]
        },
        {
            label: 'Annonces', icon: 'pi pi-fw pi-volume-off', routerLink: [''],
            items: [
                {label: 'Horaire', icon: 'pi pi-fw pi-stopwatch', routerLink: ['/evenement/horaire']},
                // {label: 'Blogs', icon: 'pi pi-fw pi-check-square', routerLink: ['/evenement/article']},
                {label: 'Calendrier', icon: 'pi pi-fw pi-volume-up', routerLink: ['/evenement/evenement']},
                {label: 'Evenements', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/evenement/vacance']},
            ]
        },
    ];
}

onMenuClick() {
    this.appMain.menuClick = true;
}


}
