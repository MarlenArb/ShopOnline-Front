import { Component, OnInit } from '@angular/core';
import { Shop } from './shop';
import { ShopService } from './shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  shops: Shop[] = [];
  shopPaginator: any;
  filterPost='';
  actualPage: number = 0;
  searched: string = '';
  noResults: boolean = false;
  filterActive: boolean = false;

  constructor(private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
/*     this.shopService.getShops().subscribe (
      shops => this.shops = shops
    ); */
    this.getShopsPerPage();
  }

  getShopsPerPage(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      this.actualPage = page;
      if(!page) {
        page = 0;
      }
      this.shopService
        .getShopsPerPage(page)
        .subscribe(response => {
          this.shops = response.content as Shop[];
          this.shopPaginator = response;
        });
    });
  }


  findShopByName(shopName: string): void {
    this.shopService.getShopbyName(shopName).subscribe (
      shops => this.shops = shops
    );

    if(!this.shops.length){
      this.noResults = true;
      this.searched = shopName;
      console.log(this.noResults);
    }
    
  }

  noFilter(): void {
    this.router.navigate(['/shops/page/0']);
    this.filterPost = '';
    this.noResults = false;
    this.searched = '';
    this.getShopsPerPage();
    this.filterActive = false;

  }

}
