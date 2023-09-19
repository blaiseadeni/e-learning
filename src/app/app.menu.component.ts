import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    
    model: any[];
    role: any;
    
    constructor(public appMain: AppMainComponent) {}
    
    ngOnInit() {
        this.role = localStorage.getItem('role');
        
        this.model = [
            
            {
                label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/'],
                items: [
                    { label: 'Administrateurs', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin'], visible:this.role ==="Admin"},
                    { label: 'Enseignants', icon: 'pi pi-fw pi-paypal', routerLink: ['/teacher'],  visible:this.role ==="Enseignant" },
                    { label: 'Etudiants', icon: 'pi pi-fw pi-user ', routerLink: ['/student'],  visible:this.role ==="Etudiant" },
                    
                ]
            },
            {
                label: 'Configurations', icon: 'pi pi-fw pi-cog', routerLink: [''],
                items: [
                    {label: 'Départements', icon: 'pi pi-fw pi-id-card', routerLink: ['/configuration/departement']},
                    {label: 'Options', icon: 'pi pi-fw pi-id-card', routerLink: ['/configuration/option']},
                    {label: 'Orientations', icon: 'pi pi-fw pi-paypal', routerLink: ['/configuration/orientation']},
                    {label: 'Auditoires', icon: 'pi pi-fw pi-paypal', routerLink: ['/configuration/promotion']},
                    {label: 'Etudiants', icon: 'pi pi-fw pi-users', routerLink: ['/configuration/etudiant']},
                    {label: 'Enseignants', icon: 'pi pi-fw pi-user ', routerLink: ['/configuration/enseignant']},
                    {label: 'Cours', icon: 'pi pi-fw pi-file-pdf', routerLink: ['/configuration/cours']},
                    {label: 'Librairie', icon: 'pi pi-fw pi-book', routerLink: ['/configuration/librairie'], class: 'rotated-icon'},
                    
                ]
            },
            {
                label: 'Evaluations', icon: 'pi pi-fw pi-file', routerLink: [''],
                items: [
                    {label: 'Créer', icon: 'pi pi-fw pi-circle-fill', routerLink: ['/evaluation/examen'],visible:this.role ==="Enseignant" },
                    {label: 'Liste', icon: 'pi pi-fw pi-stop-circle', routerLink: ['/evaluation/interro']},
                ]
            },
            {
                label: 'Conférence', icon: 'pi pi-fw pi-desktop', routerLink: [''],
                items: [
                    {label: 'Direct', icon: 'pi pi-fw pi-video', routerLink: ['/conference/welcome-live'],visible:this.role ==="Enseignant" || this.role ==="Etudiant" },
                    {label: 'Forum', icon: 'pi pi-fw pi-comments',  routerLink: ['/conference/forum']},
                    {label: 'Vidéos', icon: 'pi pi-fw pi-youtube', routerLink: ['/conference/video']},
                    {label: 'Chat', icon: 'pi pi-fw pi-comments', routerLink: ['/conference/chat'],visible:this.role ==="Etudiant"},
                ]
            },
            {
                label: 'Annonces', icon: 'pi pi-fw pi-volume-off', routerLink: [''],
                items: [
                    {label: 'Horaire', icon: 'pi pi-fw pi-stopwatch', routerLink: ['/evenement/horaire']},
                    {label: 'Evenements', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/evenement/vacance']},
                ]
            },
        ];
    }
    
    onMenuClick() {
        this.appMain.menuClick = true;
    }
    
    
}
