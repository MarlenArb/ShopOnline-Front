import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[] = [];
  clientPaginator: any;
  filterPost='';
  actualPage: number = 0;
  searched: string = '';
  noResults: boolean = false;
  filterActive: boolean = false;

  constructor(private clientService: ClientService,
               private activatedRoute: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
/*     this.clientService.getClients().subscribe (
      clients => this.clients = clients
    ); */
    this.getClientsPerPage();
  }

  getClientsPerPage(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      this.actualPage = page;
      if(!page) {
        page = 0;
      }
      this.clientService
        .getClientsPerPage(page)
        .subscribe(response => {
          this.clients = response.content as Client[];
          this.clientPaginator = response;
        });
    });

  }

  findClientByName(clientName: string): void {
    this.clientService.getClientbyName(clientName).subscribe (
      clients => this.clients = clients
    );

    if(!this.clients.length){
      this.noResults = true;
      this.searched = clientName;
      console.log(this.noResults);
    }
    
  }

  noFilter(): void {
    this.router.navigate(['/clients/page/0']);
    this.filterPost = '';
    this.noResults = false;
    this.searched = '';
    this.getClientsPerPage();
    this.filterActive = false;

  }

}
