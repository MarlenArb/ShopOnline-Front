import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Shop } from '../shop';
import { DataService } from './data.service';

@Component({
  selector: 'app-shop-interface',
  templateUrl: './shop-interface.component.html',
  styleUrls: ['./shop-interface.component.css']
})
export class ShopInterfaceComponent implements OnInit {

  shops: Shop[] = [];
  constructor(private shopService: ShopService, private dataService: DataService) { }

  ngOnInit() {
    this.shopService.getShops().subscribe(
      shops => this.shops = shops
    )
  }

  goShop(shop: Shop){
    this.dataService.name$.emit(shop.shopName)
  }

}
