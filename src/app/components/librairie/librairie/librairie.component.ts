import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';

@Component({
    selector: 'app-librairie',
    templateUrl: './librairie.component.html',
    styleUrls: ['./librairie.component.scss']
})
export class LibrairieComponent implements OnInit {


    products: Product[];

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    sourceCities: any[];

    targetCities: any[];

    orderCities: any[];

    sortKey: any

    constructor(private productService: ProductService, private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Librairie' },
            { label: 'Liste des cours', routerLink: [''] }
        ]);
    }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.sourceCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' }];
        this.targetCities = [];

        this.orderCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' }];

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];
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

}
