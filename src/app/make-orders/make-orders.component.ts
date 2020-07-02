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

  constructor(private _formBuilder: FormBuilder, private clientService: ClientService,
              private shopService: ShopService, private productService: ProductService) {}

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

}
