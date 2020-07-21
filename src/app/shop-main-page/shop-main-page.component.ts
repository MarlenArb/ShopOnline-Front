import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shop } from '../shop/shop';
import { ShopService } from '../shop/shop.service';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-shop-main-page',
  templateUrl: './shop-main-page.component.html',
  styleUrls: ['./shop-main-page.component.css']
})
export class ShopMainPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private shopService: ShopService,
              private productService: ProductService, private messageService: MessageService) { }

  shop: Shop = new Shop;
  products: Product[] = [];
  photoFace: string = "A";

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

  mouseover(){
    this.photoFace = "B";
    console.log(this.photoFace);
  }

  mouseleave(){
    this.photoFace = "A";
    console.log(this.photoFace);
  }

  addToCart(){
    this.messageService.add({severity:'success', summary:'Producto añadido', detail:`Producto *nombre *añadido al carrito con éxito`});
  }
}
