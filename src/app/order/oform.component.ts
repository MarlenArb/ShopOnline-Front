import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Order } from './order';
import { OrderService } from './order.service';
import { Client } from '../client/client';
import { ClientService } from '../client/client.service';
import { Shop } from '../shop/shop';
import { ShopService } from '../shop/shop.service';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-oform',
  templateUrl: './oform.component.html',
  styleUrls: ['./oform.component.css']
})
export class OformComponent implements OnInit {

  public order: Order = new Order();
  public clients: Client[] = [];
  public shops: Shop[] = [];
  public products: Product[] = [];

  constructor(public orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private shopService: ShopService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.loadOrder();

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


  //Añadir pedido
  public addOrder(): void {
    this.orderService.addOrder(this.order).subscribe(
      order => {
        this.router.navigate(['/orders/page/0'])
        Swal.fire('Nuevo pedido', `Nuevo pedido creado con éxito!`, 'success');
      }
    )
  }

  //Buscar pedido por id
  loadOrder(): void {
    this.activatedRoute.params.subscribe(params => {
      let idOrder = params['idOrder']
      if (idOrder) {
        this.orderService.getOrder(idOrder).subscribe((order) => this.order = order)
      }
    })
  }


  //Modidfica pedido
  modifyOrder(): void {
    this.orderService.modifyOrder(this.order).subscribe(
      order => {
        this.router.navigate(['/orders/page/0'])
        Swal.fire('Pedido Actualizado', `Pedido actualizado con éxito`, 'success')
      }
    )
  }

    //Borrar pedido
    deleteOrder( order: Order) :void{
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar el pedido del cliente ${order.client.clientName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, eliminar!',
        cancelButtonText: '¡No, cancelar!',
        cancelButtonColor: '#8f7c81',
        confirmButtonColor: '#ff005e',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.orderService.deleteOrder(order.idOrder).subscribe(
            response => {
              this.router.navigate(['/orders/page/0']);
              Swal.fire(
                '¡Eliminado!',
                `El pedido con referencia ${order.idOrder} ha sido eliminado con éxito`,
                'success'
              )
            } 
          )
        }
      })
    }

  return(): void {
    this.router.navigate(['/orders/page/0']);
  }

  public compareClients(o1: Client, o2: Client): boolean {
    return o1 == null || o2 == null ? false : o1.clientName == o2.clientName;
  }

  public compareShops(o1: Shop, o2: Shop): boolean {
    return o1 == null || o2 == null ? false : o1.shopName == o2.shopName;
  }

  public compareProducts(o1: Product, o2: Product): boolean {
    return o1 == null || o2 == null ? false : o1.productName == o2.productName;
  }

}
