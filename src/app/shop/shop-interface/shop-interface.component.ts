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
  allData: any;
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
      labels: ['A','B'],
      datasets: [
          {
              data: [3, 5],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ]
          }]    
      };

      this.totalOrders = this.data;
  }

  createDataShops(){
   // this.totalOrders = this.data;
   this.totalOrders.datasets.data = [3, 5];
   this.totalOrders.datasets.backgroundColor = ["#FF6384", "#36A2EB"];

    for(let i = 0; i < this.shops.length; i++){
      this.totalOrders.labels.push(this.shops[i].shopName);
    //  if(this.shops[i].orders.length > 0){
        

        this.totalOrders.datasets.data.push(this.shops[i].orders.length);

       console.log(this.shops[i].orders.length);
       console.log(this.shops[i].color.toUpperCase());
       this.totalOrders.datasets.backgroundColor.push(this.shops[i].color.toUpperCase());
    //  }
    }

    this.allData = this.totalOrders;

    console.log(this.totalOrders.labels);
    console.log(this.totalOrders.datasets.data);
    console.log(this.totalOrders.datasets.backgroundColor);

  }

}
