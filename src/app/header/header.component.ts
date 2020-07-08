import { Component, OnInit } from '@angular/core';
import { DataService } from '../shop/shop-interface/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public title: String = "Shop-Online";
  public color: String;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.title = "Shop-Online";
    this.color = "#e6d6df";
    this.dataService.tienda$.subscribe( shop => {
      this.title = shop.shopName;
      this.color = shop.color;

      })
  }

}
