import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Shop } from '../shop';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-interface',
  templateUrl: './shop-interface.component.html',
  styleUrls: ['./shop-interface.component.css']
})
export class ShopInterfaceComponent implements OnInit {

  shops: Shop[] = [];
  data: any;
  totalOrders: any;
  orderData: any;
  numOrdersPerShop: any;
  constructor(private shopService: ShopService, private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.shopService.getShops().subscribe(
      shops => this.shops = shops
    );
    this.createData();
    //this.createDataShops();
  }

  goShop(shop: Shop){
    this.dataService.tienda$.emit(shop);
    this.router.navigate([`tiendas/${shop.idShop}`]);
  }

  return(){
    let shop: Shop = new Shop;
    shop.color = "#e6d6df";
    shop.shopName = "Shop-Online";
    this.goShop(shop);

  }

  createData(){
    this.data = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]    
      };

      this.totalOrders = this.data;
  }

  createDataShops(){
   // this.totalOrders = this.data;
   this.totalOrders.datasets.data = [300, 50, 100];
    for(let i = 0; i < this.shops.length; i++){
      this.totalOrders.labels.push(this.shops[i].shopName);
    //  if(this.shops[i].orders.length > 0){
        

        this.totalOrders.datasets.data.push(this.shops[i].orders.length);

       console.log(this.shops[i].orders.length);
       // this.totalOrders.datasets.backgroundColor.push(this.shops[i].color);
    //  }

      

     // console.log("No tiene pedidos: " + this.shops[i].shopName);
      //console.log("Número pedidos: " + this.shops[i].orders.length);
    }

    //this.totalOrders.datasets.data.push(this.numOrdersPerShop);
    console.log(this.totalOrders.labels);
    console.log(this.totalOrders.datasets.data);


  }

}
