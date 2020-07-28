import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { Shop } from '../shop/shop';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';
import { myAnimations } from 'src/app/Animations/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [myAnimations]
})
export class HomeComponent implements OnInit {

  public inHome: boolean = true;
  public shops: Shop[];
  public products: Product[];

  constructor(private shopService: ShopService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.shopService.getShops().subscribe (
      shops => this.shops = shops
    );

    this.productService.getProducts().subscribe (
      products => this.products = products
    );
  }

}
