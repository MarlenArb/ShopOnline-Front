import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Product } from './product';

@Injectable({providedIn: 'root'})
export class ProductService {

  private urlEndPoint: string = 'http://localhost:8090/product';

  constructor(private http: HttpClient, private router: Router) { }

  //Listar productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  };


  //Añadir producto
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.urlEndPoint, product).pipe(
      catchError((e) => {
        console.log(e);
        console.error(e);
        Swal.fire('Error al agregar producto', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Encontrar un producto por id
  getProduct(idProduct: number): Observable<Product> {
    return this.http.get<Product>(`${this.urlEndPoint}/${idProduct}`).pipe(
      catchError(e => {
        this.router.navigate(['/product']);
        console.error(e.error.message);
        Swal.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }


  //Modificar un producto
  modifyProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.urlEndPoint}/${product.idProduct}`, product).pipe(
      catchError(e => {
        console.error(e.error.message);
        console.error(e.error.valids);
        Swal.fire('Error al editar el producto', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Eliminar product
  deleteProduct(idProduct: number): Observable<Product> {
    return this.http.delete<Product>(`${this.urlEndPoint}/${idProduct}`).pipe(
      catchError(e => {
        console.error(e.message);
        Swal.fire('Error al eliminar producto', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

    //Listar pedidos con paginación
    getProductsPerPage(page: number): Observable<any> {
      return this.http.get<Product[]>(this.urlEndPoint + '/page/' + page).pipe(
        map(
          (response: any) => {
            (response.content as Product[]).map(user => {
              return user;
            });
            return response;
          }
        )
      );
    }

  //Filtrar producto por nombre
  getProductbyName(productName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.urlEndPoint}/page/:page/${productName}`).pipe(
      catchError(e => {
        this.router.navigate(['/products/page/0']);
        console.error(e.error.message);
        Swal.fire('Error al filtrar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }
}
