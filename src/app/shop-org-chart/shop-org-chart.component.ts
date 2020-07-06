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
  productosNode: TreeNode[] = [];
  tiendasYproductos: TreeNode[] = [];
  allTree: TreeNode[] = [];
  tiendas: TreeNode[] = [];
  productos: TreeNode[] = [];
  tienda: TreeNode = {label: 'hola'};
  viewButton: boolean = true;

  ngOnInit() {
  this.shopService.getShops().subscribe (
      shops => this.shops = shops
    ); 

    this.productService.getProducts().subscribe (
      products => this.products = products
    );
}

fillShops(): void{
  this.tiendas = [];
  for(let i = 0; i<this.shops.length; i++){
    this.tienda.label = `${this.shops[i].shopName}`;
    this.tiendas.push({label:`${this.shops[i].shopName}`, type: 'shop'});
    this.tiendasYproductos.push({label:`${this.shops[i].shopName}`, children: this.productos});
  }
 // console.log(this.tiendas);
}

fillProducts(): void{
  //console.log(this.products) ;
  this.productos = [];
  for(let i = 0; i<this.products.length; i++){ 
    this.productos.push({label:`${this.products[i].productName}`, type: 'product'});
  }
  //console.log(this.productos);
}

generateTree(): void{
  this.viewButton = false;
  this.fillProducts();
  this.fillShops();
  this.allTree = [{
   label: "Tiendas",
    children: this.tiendasYproductos
}];
  this.data = [{
    //expandedIcon: "pi pi-folder-open",
   label: "Tiendas",
   type: "root",
   //icon: "pi pi-shopping-cart",
   styleClass: "company",
    children: this.tiendas
}];

}

}
