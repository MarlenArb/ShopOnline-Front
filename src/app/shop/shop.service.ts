import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Shop } from './shop';

@Injectable({providedIn: 'root'})
export class ShopService {

  private urlEndPoint: string = 'http://localhost:8090/shop';

  constructor(private http: HttpClient, private router: Router) { }

  //Listar tiendas
  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  };


  //Añadir tienda
  addShop(shop: Shop): Observable<Shop> {
    return this.http.post<Shop>(this.urlEndPoint, shop).pipe(
      catchError((e) => {
        console.log(e);
        console.error(e);
        Swal.fire('Error al crear tienda', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Encontrar una tienda por id
  getShop(idShop: number): Observable<Shop> {
    return this.http.get<Shop>(`${this.urlEndPoint}/${idShop}`).pipe(
      catchError(e => {
        this.router.navigate(['/shop']);
        console.error(e.error.message);
        Swal.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  //Encontrar una tienda por nombre
  getShopByName(name: string): Observable<Shop> {
    return this.http.get<Shop>(`${this.urlEndPoint}/${name}`).pipe(
      catchError(e => {
        console.error(e.error.message);
        Swal.fire('Error al encontrar la tienda', e, 'error');
        return throwError(e);
      })
    );
  }

  //Modificar una tienda
  modifyShop(shop: Shop): Observable<Shop> {
    return this.http.put<Shop>(`${this.urlEndPoint}/${shop.idShop}`, shop).pipe(
      catchError(e => {
        console.error(e.error.message);
        console.error(e.error.valids);
        Swal.fire('Error al editar la tienda', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Eliminar tienda
  deleteShop(idShop: number): Observable<Shop> {
    return this.http.delete<Shop>(`${this.urlEndPoint}/${idShop}`).pipe(
      catchError(e => {
        console.error(e.message);
        Swal.fire('Error al eliminar tienda', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

    //Listar tiendas con paginación
    getShopsPerPage(page: number): Observable<any> {
      return this.http.get<Shop[]>(this.urlEndPoint + '/page/' + page).pipe(
        map(
          (response: any) => {
            (response.content as Shop[]).map(user => {
              return user;
            });
            return response;
          }
        )
      );
    }

  //Filtrar tiendas por nombre
  getShopbyName(shopName: string): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${this.urlEndPoint}/page/:page/${shopName}`).pipe(
      catchError(e => {
        this.router.navigate(['/shops/page/0']);
        console.error(e.error.message);
        Swal.fire('Error al filtrar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }
}
