import { Component, OnInit } from '@angular/core';
import { Order } from './order';
import { OrderService } from './order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];
  orderPaginator: any;
  filterPost='';
  actualPage: number = 0;
  searched: string = '';
  noResults: boolean = false;
  filterActive: boolean = false;
  showProducts: boolean = false;
  selectedOrder: Order = new Order;

  constructor(private orderService: OrderService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
/*     this.orderService.getOrders().subscribe (
      orders => this.orders = orders
    ); */
    this.getOrdersPerPage();
  }

  getOrdersPerPage(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      this.actualPage = page;
      if(!page) {
        page = 0;
      }
      this.orderService
        .getOrdersPerPage(page)
        .subscribe(response => {
          this.orders = response.content as Order[];
          this.orderPaginator = response;
        });
    });
  }

  findOrderByRef(ref: string): void {
    this.orderService.getOrdersbyRef(ref).subscribe (
      orders => this.orders = orders
    );

    if(!this.orders.length){
      this.noResults = true;
      this.searched = ref;
      console.log(this.noResults);
    }
    
  }

  noFilter(): void {
    this.router.navigate(['/orders/page/0']);
    this.filterPost = '';
    this.noResults = false;
    this.searched = '';
    this.getOrdersPerPage();
    this.filterActive = false;

  }

  listProduct(order: Order){
    this.selectedOrder = order;
    this.showProducts = true;
  }

}
