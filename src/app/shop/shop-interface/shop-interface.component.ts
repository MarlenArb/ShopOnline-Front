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
  constructor(private shopService: ShopService, private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.shopService.getShops().subscribe(
      shops => this.shops = shops
    )
  }

  goShop(shop: Shop){
    this.dataService.tienda$.emit(shop);
    this.router.navigate([`tiendas/${shop.idShop}`]);
  }

  return(){
    let shop: Shop = new Shop;
    shop.color = "#e6d6df";
    shop.shopName = "Shop-Online";
    this.router.navigate([`home`]);

  }

}
