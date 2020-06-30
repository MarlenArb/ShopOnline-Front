import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-supplier-paginator',
  templateUrl: './supplier-paginator.component.html',
  styleUrls: ['./supplier-paginator.component.css']
})
export class SupplierPaginatorComponent implements OnInit {

  @Input() supplierPaginator: any;
  pages: number[];
  from: number;
  to: number;

  constructor() { }

  ngOnInit(): void {
    this.startPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updated = changes['supplierPaginator'];
    if(changes.previousValue) {
      this.startPaginator();
    }
  }

  private startPaginator(): void {
    this.from = Math.min(Math.max(1, this.supplierPaginator.number - 9), this.supplierPaginator.totalPages - 10);
    this.to = Math.max(Math.min(this.supplierPaginator.totalPages, this.supplierPaginator.number + 9), 11);
    if(this.supplierPaginator.totalPages > 10) {
      this.pages = new Array(this.from - this.to + 1).fill(0).map((valor, indice) => indice + this.to);
    } else {
      this.pages = new Array(this.supplierPaginator.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
