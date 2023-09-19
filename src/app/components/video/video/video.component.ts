import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table/public_api';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { ProductService } from 'src/app/demo/service/productservice';
import { VideoService } from 'src/app/services/video/video.service';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['./video.component.scss']
})
export class VideoComponent {
    
    videoDialog: boolean;
    
    videoForm: FormGroup;
    
    file?: File;
    
    cours: any = [];
    
    videos: any = [];
    
    sortOptions: SelectItem[];
    
    sortOrder: number;
    
    sortField: string;
    
    sourceCities: any[];
    
    targetCities: any[];
    
    orderCities: any[];
    
    sortKey: any
    
    constructor(private service: VideoService,private messageService: MessageService,private productService: ProductService, private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Librairie' },
            { label: 'Liste des cours', routerLink: [''] }
        ]);
    }
    
    ngOnInit() {
        this.findAllCous();
        this.findAllVideos();
        
        
        this.videoForm = new FormGroup({
            titre: new FormControl('', Validators.required),
            coursId: new FormControl('', Validators.required),
            file: new FormControl('', Validators.required),
        })
    }
    
    addVideo() {
        if (this.videoForm.valid) {
            let formData:FormData = new FormData(); 
            formData.append("titre",this.titreValue.value);
            formData.append("coursId",this.coursIdValue.value.id);
            formData.append("file", this.file[0]);
            if (this.videos.id) {
                this.service.updateVideo(this.videos.id, formData).subscribe({
                    next: (value) => {
                        this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Success', life: 3000 }); this.findAllVideos();
                    },
                    complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Modification avec succès', life: 3000 }); this.findAllVideos(); },
                    error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Modification avec succès', life: 3000 }); this.findAllVideos(); }
                    
                })
            } else {
                this.service.addVideo(formData).subscribe({
                    next: (value) => {
                        this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 }); this.findAllVideos();
                    },
                    complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Enregistrement avec succès', life: 3000 }); this.findAllVideos(); },
                    error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Enregistrement avec succès', life: 3000 }); this.findAllVideos(); }
                    
                })
            }
        } else {
            this.validateAllFields(this.videoForm)
        };
    }
    
    save() {
        if (this.videoForm.valid) {
            let formData:FormData = new FormData(); 
            formData.append("titre",this.titreValue.value);
            formData.append("coursId",this.coursIdValue.value.id);
            formData.append("file", this.file[0]);
            this.service.addVideo(formData).subscribe({
                next: (value) => {
                    this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Success', life: 3000 }); this.findAllVideos();
                },
                // complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Enregistrement avec succès', life: 3000 }); this.findAllVideos(); },
                // error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Enregistrement avec succès', life: 3000 }); this.findAllVideos(); }
                
            })
        } else {
            this.validateAllFields(this.videoForm)
        }
        
    }
    
    onVideoChanged(files) {
        this.file = files;          
    }
    
    
    get titreValue() {
        return  this.videoForm.get('titre')
    } 
    get coursIdValue() {
        return  this.videoForm.get('coursId')
    } 
    
    findAllVideos() {
        this.service.findAllVideos()
        .subscribe({
            next: (response) => {
                this.videos = response;
                console.log(this.videos);
            },
            error: (response) => {
                console.log(response);
            }
        })
    }  
    
    findAllCous() {
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
    
    openDialg() {
        this.videoDialog = true;
    }
    
    hideDialog() {
        this.videoDialog = false;
    }
    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
    private validateAllFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field)
            
            if (control instanceof FormControl) {
                control.markAsDirty({ onlySelf: true })
            } else if (control instanceof FormGroup) {
                this.validateAllFields(control)
            }
        })
    }
}
