import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { ForumService } from 'src/app/services/forum/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent {
  
  productDialog: boolean = false;
  
  deleteProductDialog: boolean = false;
  
  deleteProductsDialog: boolean = false;
  
  products: Product[] = [];
  
  product: Product = {};
  
  selectedProducts: Product[] = [];
  
  submitted: boolean = false;
  
  cols: any[] = [];
  
  statuses: any[] = [];
  
  rowsPerPageOptions = [5, 10, 20];
  
  forums: any = [];
  
  constructor(private service: ForumService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        { label: 'Forum' },
        { label: 'Discussions' },
      ]);
    }
    
    ngOnInit() {
      this.findAll();
      
    }
    
    findAll() {
      this.service.findAllForums()
      .subscribe({
        next: (response) => {
          this.forums = response;
          console.log(response);
        },
        error: (Response) => {
        }
      })
    }  
    openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
    }
    
    
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    }
    
    
    
    
    
    
    
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
    
  }
  