import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shop } from '../shop/shop';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-shop-main-page',
  templateUrl: './shop-main-page.component.html',
  styleUrls: ['./shop-main-page.component.css']
})
export class ShopMainPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private shopService: ShopService) { }

  shop: Shop = new Shop;

  ngOnInit() {
    this.getShop();
  }

  getShop(){
    this.activatedRoute.params.subscribe(params => {
      let idShop = params['idShop']
      if (idShop) {
        this.shopService.getShop(idShop).subscribe((shop) => this.shop = shop)
      }
    })
    
  }
}
