import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-order-paginator',
  templateUrl: './order-paginator.component.html',
  styleUrls: ['./order-paginator.component.css']
})
export class OrderPaginatorComponent implements OnInit {

  @Input() orderPaginator: any;
  pages: number[];
  from: number;
  to: number;

  constructor() { }

  ngOnInit(): void {
    this.startPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updated = changes['orderPaginator'];
    if(changes.previousValue) {
      this.startPaginator();
    }
  }

  private startPaginator(): void {
    this.from = Math.min(Math.max(1, this.orderPaginator.number - 9), this.orderPaginator.totalPages - 10);
    this.to = Math.max(Math.min(this.orderPaginator.totalPages, this.orderPaginator.number + 9), 11);
    if(this.orderPaginator.totalPages > 10) {
      this.pages = new Array(this.from - this.to + 1).fill(0).map((valor, indice) => indice + this.to);
    } else {
      this.pages = new Array(this.orderPaginator.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
