import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { Shop } from '../shop/shop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public inHome: boolean = true;
  public shops: Shop[];
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getShops().subscribe (
      shops => this.shops = shops
    );
  }

}
