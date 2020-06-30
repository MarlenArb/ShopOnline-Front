import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-paginator',
  templateUrl: './product-paginator.component.html',
  styleUrls: ['./product-paginator.component.css']
})
export class ProductPaginatorComponent implements OnInit {

  @Input() productPaginator: any;
  pages: number[];
  from: number;
  to: number;

  constructor() { }

  ngOnInit(): void {
    this.startPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updated = changes['productPaginator'];
    if(changes.previousValue) {
      this.startPaginator();
    }
  }

  private startPaginator(): void {
    this.from = Math.min(Math.max(1, this.productPaginator.number - 9), this.productPaginator.totalPages - 10);
    this.to = Math.max(Math.min(this.productPaginator.totalPages, this.productPaginator.number + 9), 11);
    if(this.productPaginator.totalPages > 10) {
      this.pages = new Array(this.from - this.to + 1).fill(0).map((valor, indice) => indice + this.to);
    } else {
      this.pages = new Array(this.productPaginator.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
