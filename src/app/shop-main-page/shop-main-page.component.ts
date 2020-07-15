import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shop } from '../shop/shop';
import { ShopService } from '../shop/shop.service';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-shop-main-page',
  templateUrl: './shop-main-page.component.html',
  styleUrls: ['./shop-main-page.component.css']
})
export class ShopMainPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private shopService: ShopService,
              private productService: ProductService) { }

  shop: Shop = new Shop;
  products: Product[] = [];
  
  data: any;

  ngOnInit() {
    this.getShop();
    this.productService.getProducts().subscribe( 
      products => this.products = products
    )
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
