import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Client } from '../client/client';
import { ClientService } from '../client/client.service';
import { Order } from '../order/order';
import { Shop } from '../shop/shop';
import { ShopService } from '../shop/shop.service';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-make-orders',
  templateUrl: './make-orders.component.html',
  styleUrls: ['./make-orders.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class MakeOrdersComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  public clients: Client[] = [];
  public shops: Shop[] = [];
  public order: Order = new Order;
  public products: Product[] = [];
  public productsSelected: Product[] = [];
  public totalPrice: number = 0;

  today: Date = new Date;

  constructor(private _formBuilder: FormBuilder, private clientService: ClientService,
              private shopService: ShopService, private productService: ProductService,
              private orderService: OrderService) {}

  ngOnInit() {
    this.loadStepper();
    this.clientService.getClients().subscribe (
      clients => this.clients = clients
    );
    this.shopService.getShops().subscribe (
      shops => this.shops = shops
    );

    this.productService.getProducts().subscribe (
      products => this.products = products
    );
  }

  loadStepper(): void{
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  printProductsSelected(): void{
    this.order.products = this.productsSelected;
    this.totalPrice = 0;
    for(let i = 0; i<this.productsSelected.length; i++){
      this.totalPrice = this.totalPrice + this.productsSelected[i].price;
    }
    console.log("Productos seleccionados: " + this.productsSelected.length);
    console.log("Importe: " + this.totalPrice + " €");
  }

  resetearStepper(): void{
    this.order = new Order;
    this.productsSelected = [];
    this.totalPrice = 0;
  }

  getDate(): void{
    //this.today.getDate() + "/" + (this.today.getMonth()) + "/" + this.today.getFullYear();
    this.order.orderDate = this.today;
    console.log(this.today);
  }

    //Añadir pedido
  public addOrder(): void {
    this.getDate();
    this.orderService.addOrder(this.order).subscribe(
      order => {
        Swal.fire('Nuevo pedido', `Nuevo pedido realizado con éxito!`, 'success');
        this.resetearStepper();
      }
    )
  }
}
