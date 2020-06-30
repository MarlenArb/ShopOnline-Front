import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-shop-paginator',
  templateUrl: './shop-paginator.component.html',
  styleUrls: ['./shop-paginator.component.css']
})
export class ShopPaginatorComponent implements OnInit {

  @Input() shopPaginator: any;
  pages: number[];
  from: number;
  to: number;

  constructor() { }

  ngOnInit(): void {
    this.startPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updated = changes['shopPaginator'];
    if(changes.previousValue) {
      this.startPaginator();
    }
  }

  private startPaginator(): void {
    this.from = Math.min(Math.max(1, this.shopPaginator.number - 9), this.shopPaginator.totalPages - 10);
    this.to = Math.max(Math.min(this.shopPaginator.totalPages, this.shopPaginator.number + 9), 11);
    if(this.shopPaginator.totalPages > 10) {
      this.pages = new Array(this.from - this.to + 1).fill(0).map((valor, indice) => indice + this.to);
    } else {
      this.pages = new Array(this.shopPaginator.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
