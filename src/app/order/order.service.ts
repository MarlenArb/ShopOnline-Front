import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Order } from './order';

@Injectable({providedIn: 'root'})
export class OrderService {

  private urlEndPoint: string = 'http://localhost:8090/order';

  constructor(private http: HttpClient, private router: Router) { }

  //Listar pedidos
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  };


  //Añadir pedido
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.urlEndPoint, order).pipe(
      catchError((e) => {
        console.log(e);
        console.error(e);
        Swal.fire('Error al crear pedido', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Encontrar un pedido por id
  getOrder(idOrder: number): Observable<Order> {
    return this.http.get<Order>(`${this.urlEndPoint}/${idOrder}`).pipe(
      catchError(e => {
        this.router.navigate(['/order']);
        console.error(e.error.message);
        Swal.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }


  //Modificar un pedido
  modifyOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.urlEndPoint}/${order.idOrder}`, order).pipe(
      catchError(e => {
        console.error(e.error.message);
        console.error(e.error.valids);
        Swal.fire('Error al editar el pedido', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Eliminar pedido
  deleteOrder(idOrder: number): Observable<Order> {
    return this.http.delete<Order>(`${this.urlEndPoint}/${idOrder}`).pipe(
      catchError(e => {
        console.error(e.message);
        Swal.fire('Error al eliminar pedido', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

    //Listar pedidos con paginación
    getOrdersPerPage(page: number): Observable<any> {
      return this.http.get<Order[]>(this.urlEndPoint + '/page/' + page).pipe(
        map(
          (response: any) => {
            (response.content as Order[]).map(user => {
              return user;
            });
            return response;
          }
        )
      );
    }

  //Filtrar pedidos por ref
  getOrdersbyRef(ref: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.urlEndPoint}/page/:page/${ref}`).pipe(
      catchError(e => {
        this.router.navigate(['/orders/page/0']);
        console.error(e.error.message);
        Swal.fire('Error al filtrar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }
}
