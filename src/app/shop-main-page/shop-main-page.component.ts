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
