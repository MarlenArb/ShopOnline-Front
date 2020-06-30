import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  productPaginator: any;
  filterPost='';
  actualPage: number = 0;
  searched: string = '';
  noResults: boolean = false;
  filterActive: boolean = false;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
/*     this.productService.getProducts().subscribe (
      products => this.products = products
    ); */

    this.getProductsPerPage();
  }

  getProductsPerPage(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      this.actualPage = page;
      if(!page) {
        page = 0;
      }
      this.productService
        .getProductsPerPage(page)
        .subscribe(response => {
          this.products = response.content as Product[];
          this.productPaginator = response;
        });
    });
  }

  findProductByName(productName: string): void {
    this.productService.getProductbyName(productName).subscribe (
      products => this.products = products
    );

    if(!this.products.length){
      this.noResults = true;
      this.searched = productName;
      console.log(this.noResults);
    }
    
  }

  noFilter(): void {
    this.router.navigate(['/products/page/0']);
    this.filterPost = '';
    this.noResults = false;
    this.searched = '';
    this.getProductsPerPage();
    this.filterActive = false;

  }

}
