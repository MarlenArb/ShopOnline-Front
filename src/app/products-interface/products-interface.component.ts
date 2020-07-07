import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-products-interface',
  templateUrl: './products-interface.component.html',
  styleUrls: ['./products-interface.component.css']
})
export class ProductsInterfaceComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: Product = new Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
     this.productService.getProducts().subscribe (
      products => this.products = products
    );
  }

  productSeleted(product: Product){
    console.log(product.productName);
  }

  selectCar(event, product: Product, overlaypanel: OverlayPanel) {
    this.selectedProduct = product;
    overlaypanel.toggle(event);
}
}
