import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Client } from './client';

@Injectable({providedIn: 'root'})
export class ClientService {

  private urlEndPoint: string = 'http://localhost:8090/client';

  constructor(private http: HttpClient, private router: Router) { }

  //Listar clientes
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  };


  //Añadir cliente
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.urlEndPoint, client).pipe(
      catchError((e) => {
        console.log(e);
        console.error(e);
        Swal.fire('Error al crear cliente', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Encontrar un cliente por id
  getClient(idClient: number): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${idClient}`).pipe(
      catchError(e => {
        this.router.navigate(['/client']);
        console.error(e.error.message);
        Swal.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }


  //Modificar un cliente
  modifyClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlEndPoint}/${client.idClient}`, client).pipe(
      catchError(e => {
        console.error(e.error.message);
        console.error(e.error.valids);
        Swal.fire('Error al editar el cliente', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Eliminar cliente
  deleteClient(idClient: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndPoint}/${idClient}`).pipe(
      catchError(e => {
        console.error(e.message);
        Swal.fire('Error al eliminar cliente', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

    //Listar clientes con paginación
    getClientsPerPage(page: number): Observable<any> {
      return this.http.get<Client[]>(this.urlEndPoint + '/page/' + page).pipe(
        map(
          (response: any) => {
            (response.content as Client[]).map(user => {
              return user;
            });
            return response;
          }
        )
      );
    }

  //Filtrar clientes por nombre
  getClientbyName(clientName: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.urlEndPoint}/page/:page/${clientName}`).pipe(
      catchError(e => {
        this.router.navigate(['/clients/page/0']);
        console.error(e.error.message);
        Swal.fire('Error al filtrar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }


}
