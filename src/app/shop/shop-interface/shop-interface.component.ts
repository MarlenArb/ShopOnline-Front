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
  totalOrders: any = [];
  orderData: any;
  numOrdersPerShop: any;
  allData: any = [];;
  labels: any[] = [];
  data2: any[] = [];
  backgroundColor: any[] = [];

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
      labels: [],
      datasets: [
          {
              data: [],
              backgroundColor: []
          }]    
      };

      //this.totalOrders = this.data;
  }

  createDataShops(){
   // this.totalOrders = this.data;
   //this.totalOrders.datasets.data = [];
   //this.totalOrders.datasets.backgroundColor = [];

    for(let i = 0; i < this.shops.length; i++){
      this.labels.push(this.shops[i].shopName);
    //  if(this.shops[i].orders.length > 0){
      this.data2.push(this.shops[i].orders.length);
      this.backgroundColor.push(this.shops[i].color.toUpperCase());
    //  }
    }

    this.data = {
      labels: this.labels,
      datasets: [
          {
              data:  this.data2 ,
              backgroundColor:  this.backgroundColor 
          }]    
      };

/*     this.totalOrders.labels = this.labels;
    this.totalOrders.datasets.data = this.data2;
    this.totalOrders.backgroundColor = this.totalOrders;
    this.allData = this.totalOrders; */



    console.log(this.data.labels);
    console.log(this.data2);
    console.log(this.backgroundColor); 

  }

}
