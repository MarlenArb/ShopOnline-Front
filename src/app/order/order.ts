import { Client } from '../client/client';
import { Shop } from '../shop/shop';
import { Product } from '../product/product';

export class Order {

  idOrder: number;
  orderDate: Date;
  client: Client;
  shop: Shop;
  products: Product[];
}
