import { Order } from '../order/order';

export class Shop {
  idShop: number;
  shopName: String;
  cif: String;
  color: String;
  orders: Order[] = [];

}
