import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Client } from './client';
import { ClientService } from './client.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-cform',
  templateUrl: './cform.component.html',
  styleUrls: ['./cform.component.css']
})
export class CformComponent implements OnInit {

  public client: Client = new Client();
  public genders: String[] = ["MUJER", "HOMBRE"];

  constructor(public clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadClient();
  }


  //Añadir cliente
  public addClient(): void {
    this.clientService.addClient(this.client).subscribe(
      client => {
        this.router.navigate(['/clients/page/0'])
        Swal.fire('Nuevo cliente', `Nuevo cliente creado con éxito!`, 'success');
      }
    )
  }

  //Buscar cliente por id
  loadClient(): void {
    this.activatedRoute.params.subscribe(params => {
      let idClient = params['idClient']
      if (idClient) {
        this.clientService.getClient(idClient).subscribe((client) => this.client = client)
      }
    })
  }


  //Modidfica cliente
  modifyClient(): void {
    this.clientService.modifyClient(this.client).subscribe(
      client => {
        this.router.navigate(['/clients/page/0'])
        this.messageService.add({severity:'success', summary:'Cliente Actualizado', detail:`Cliente ${this.client.clientName} actualizado con éxito`});
      }
    )
  }

    //Borrar cliente
    deleteClient( client: Client) :void{
      
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar el cliente ${client.clientName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, eliminar!',
        cancelButtonText: '¡No, cancelar!',
        cancelButtonColor: '#8f7c81',
        confirmButtonColor: '#ff005e',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.clientService.deleteClient(client.idClient).subscribe(
            response => {
              //this.clients = this.clients.filter(cl => cl !== client)
              this.router.navigate(['/clients/page/0']);
              Swal.fire(
                '¡Eliminado!',
                `El cliente ${client.clientName} ha sido eliminado con éxito`,
                'success'
              )
            } 
          )
        }
      })
      
    }

  return(): void {
    this.router.navigate(['/clients/page/0']);
  }

  public compareGenders(o1: string, o2: string): boolean {
    return o1 == null || o2 == null ? false : o1 == o2;
  }


}
