import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import { ShopService } from '../shop/shop.service';
import { Shop } from '../shop/shop';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-shop-org-chart',
  templateUrl: './shop-org-chart.component.html',
  styleUrls: ['./shop-org-chart.component.css']
})
export class ShopOrgChartComponent implements OnInit {

  shops: Shop[] = [];
  products: Product[] = [];

  constructor(private shopService: ShopService,
              private productService: ProductService) { }



  data: TreeNode[];
  tiendas: TreeNode[] = [];
  productos: TreeNode[] = [];
  tienda: TreeNode = {label: 'hola'};

  ngOnInit() {
  this.shopService.getShops().subscribe (
      shops => this.shops = shops
    ); 

    this.productService.getProducts().subscribe (
      products => this.products = products
    );

    //this.generateTree();
/*     this.data = [{
        label: 'Tiendas',
        children: [
            {
                label: 'Child 1',
                children: [
                    {
                        label: 'Grandchild 1.1', type: 'leaf'
                    },
                    {
                        label: 'Grandchild 1.2', type: 'leaf'
                    }
                ]
            },
            {
                label: 'Child 2',
                children: [
                    {
                        label: 'Child 2.1', type: 'leaf'
                    },
                    {
                        label: 'Child 2.2', type: 'leaf'
                    }
                ]
            }
        ]
    }]; */
}

fillShops(): void{
  this.tiendas = [];
  for(let i = 0; i<this.shops.length; i++){
    this.tienda.label = `${this.shops[i].shopName}`;
    this.tiendas.push({label:`${this.shops[i].shopName}`, children: this.productos});
  }
  console.log(this.tiendas);
}

fillProducts(): void{
  console.log(this.products) ;
  this.productos = [];
  for(let i = 0; i<3; i++){ //el maximo es 3, sería this.products.length
    this.productos.push({label:`${this.products[i].productName}`});
  }
  console.log(this.productos);
}

generateTree(): void{
  this.data = [{
    label: 'Tiendas',
    children: this.tiendas
}];

}

}
