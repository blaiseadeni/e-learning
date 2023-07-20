import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { CoursService } from 'src/app/services/cours/cours.service';


@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent {
  
  coursForm: FormGroup;
  
  file?:File;
  
  auditoires: any = [];
  enseignants: any = [];
  cours: any = [];
  heures: any[] = [];
  
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
  
  constructor(private service: CoursService, private fb:FormBuilder, private messageService: MessageService,
    private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService,private productService: ProductService) {
      this.breadcrumbService.setItems([
        { label: 'Configurations' },
        { label: 'Cours' },
      ]);
    }
    
    get f(){
      return this.coursForm.controls;
    }
    
    onPost(){
      const frmData:any= Object.assign(this.coursForm.value);
      frmData.file = this.file;
      console.log(frmData);
      // we will call our service, and pass this object to it
      // this.service.addCours(frmData).subscribe({
      //   next:(res)=>{
      //     this.findAllCous();
      //   },
      //   error: (err)=>{
      //     console.log(err);
      //   }
      // })
    }
    
    findAllAudi() {
      this.service.findAllAud()
      .subscribe({
        next: (response) => {
          this.auditoires = response;
          console.log(this.auditoires);
        },
        error: (response) => {
          console.log(response);
        }
      })
    }  
    
    findAllEns() {
      this.service.findAllEns()
      .subscribe({
        next: (response) => {
          this.enseignants = response;
          console.log(this.enseignants);
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
    
    onChange(event:any){
      this.file=event.target.files[0];
    }
    
    
    ngOnInit() {
      this.findAllAudi();
      this.findAllEns();
      this.findAllCous();
      this.coursForm = new FormGroup({
        titre: new FormControl('', Validators.required),
        chargeHoraire: new FormControl('', Validators.required),
        auditoireId: new FormControl('', Validators.required),
        enseignantId: new FormControl('', Validators.required),
        file: new FormControl([]),
      })
      
      this.heures = [
        { libelle: '15h', value: '15h' },
        { libelle: '20h', value: '20h' },
        { libelle: '30h', value: '30h' },
        { libelle: '45h', value: '45h' },
        { libelle: '60h', value: '60h' },
        { libelle: '90h', value: '90h' },
        { libelle: '120h', value: '120h' },
        
      ];
      
      
      this.productService.getProducts().then(data => this.products = data);
      this.cols = [
        { field: 'name', header: 'Name' },
        { field: 'price', header: 'Price' },
        { field: 'category', header: 'Category' },
        { field: 'rating', header: 'Reviews' },
        { field: 'inventoryStatus', header: 'Status' }
      ];
      
      this.statuses = [
        { label: 'INSTOCK', value: 'instock' },
        { label: 'LOWSTOCK', value: 'lowstock' },
        { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];
    }
    openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
    }
    
    deleteSelectedProducts() {
      this.deleteProductsDialog = true;
    }
    
    editProduct(product: Product) {
      this.product = { ...product };
      this.productDialog = true;
    }
    
    deleteProduct(product: Product) {
      this.deleteProductDialog = true;
      this.product = { ...product };
    }
    
    confirmDeleteSelected() {
      this.deleteProductsDialog = false;
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      this.selectedProducts = [];
    }
    
    confirmDelete() {
      this.deleteProductDialog = false;
      this.products = this.products.filter(val => val.id !== this.product.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      this.product = {};
    }
    
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    }
    
    saveProduct() {
      this.submitted = true;
      
      if (this.product.name?.trim()) {
        if (this.product.id) {
          // @ts-ignore
          this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
          this.products[this.findIndexById(this.product.id)] = this.product;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
          this.product.id = this.createId();
          this.product.code = this.createId();
          this.product.image = 'product-placeholder.svg';
          // @ts-ignore
          this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
          this.products.push(this.product);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        
        this.products = [...this.products];
        this.productDialog = false;
        this.product = {};
      }
    }
    
    findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
          index = i;
          break;
        }
      }
      
      return index;
    }
    
    createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    }
    
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
  }
  