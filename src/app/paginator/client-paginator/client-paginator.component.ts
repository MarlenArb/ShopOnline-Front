import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-client-paginator',
  templateUrl: './client-paginator.component.html',
  styleUrls: ['./client-paginator.component.css']
})
export class ClientPaginatorComponent implements OnInit {

  @Input() clientPaginator: any;
  pages: number[];
  from: number;
  to: number;

  constructor() { }

  ngOnInit(): void {
    this.startPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updated = changes['clientPaginator'];
    if(changes.previousValue) {
      this.startPaginator();
    }
  }

  private startPaginator(): void {
    this.from = Math.min(Math.max(1, this.clientPaginator.number - 9), this.clientPaginator.totalPages - 10);
    this.to = Math.max(Math.min(this.clientPaginator.totalPages, this.clientPaginator.number + 9), 11);
    if(this.clientPaginator.totalPages > 10) {
      this.pages = new Array(this.from - this.to + 1).fill(0).map((valor, indice) => indice + this.to);
    } else {
      this.pages = new Array(this.clientPaginator.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
