import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import { ShopService } from '../shop/shop.service';
import { Shop } from '../shop/shop';

@Component({
  selector: 'app-shop-org-chart',
  templateUrl: './shop-org-chart.component.html',
  styleUrls: ['./shop-org-chart.component.css']
})
export class ShopOrgChartComponent implements OnInit {

  shops: Shop[] = [];

  constructor(private shopService: ShopService) { }



  data: TreeNode[];
  tiendas: TreeNode[] = [];
  tienda: TreeNode = {label: 'hola'};

  ngOnInit() {
  this.shopService.getShops().subscribe (
      shops => this.shops = shops
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
    this.tiendas.push(this.tienda);
    console.log(this.shops[i].shopName);
    console.log("Tienda Label: " + this.tienda.label);
    console.log(this.tiendas);
  }
/*   this.shops.forEach(shop => {
    this.tienda.label = `${shop.shopName}`;
    this.tiendas.push(this.tienda);
    console.log(shop.shopName);
    console.log(this.tiendas);
  }); */
  console.log(this.tiendas);
  console.log(this.shops.length)
}

generateTree(): void{
  this.data = [{
    label: 'Tiendas',
    children: this.tiendas
}];

}

}
