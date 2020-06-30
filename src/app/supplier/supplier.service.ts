import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Supplier } from './supplier';

@Injectable({providedIn: 'root'})
export class SupplierService {

  private urlEndPoint: string = 'http://localhost:8090/supplier';

  constructor(private http: HttpClient, private router: Router) { }

  //Listar proveedores
  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  };


  //Añadir proveedor
  addSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.urlEndPoint, supplier).pipe(
      catchError((e) => {
        console.log(e);
        console.error(e);
        Swal.fire('Error al crear proveedor', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Encontrar una proveedor por id
  getSupplier(idSupplier: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.urlEndPoint}/${idSupplier}`).pipe(
      catchError(e => {
        this.router.navigate(['/supplier']);
        console.error(e.error.message);
        Swal.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  //Encontrar una proveedor por nombre
  getSupplierByName(name: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.urlEndPoint}/${name}`).pipe(
      catchError(e => {
        console.error(e.error.message);
        Swal.fire('Error al encontrar el proveedor', e, 'error');
        return throwError(e);
      })
    );
  }

  //Modificar un poveedor
  modifySupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.urlEndPoint}/${supplier.idSupplier}`, supplier).pipe(
      catchError(e => {
        console.error(e.error.message);
        console.error(e.error.valids);
        Swal.fire('Error al editar el proveedor', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Eliminar proveedor
  deleteSupplier(idSupplier: number): Observable<Supplier> {
    return this.http.delete<Supplier>(`${this.urlEndPoint}/${idSupplier}`).pipe(
      catchError(e => {
        console.error(e.message);
        Swal.fire('Error al eliminar proveedor', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

    //Listar proveedores con paginación
    getSuppliersPerPage(page: number): Observable<any> {
      return this.http.get<Supplier[]>(this.urlEndPoint + '/page/' + page).pipe(
        map(
          (response: any) => {
            (response.content as Supplier[]).map(user => {
              return user;
            });
            return response;
          }
        )
      );
    }

  //Filtrar proveedores por nombre
  getSupplierbyName(name: string): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.urlEndPoint}/page/:page/${name}`).pipe(
      catchError(e => {
        this.router.navigate(['/suppliers/page/0']);
        console.error(e.error.message);
        Swal.fire('Error al filtrar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }
}
