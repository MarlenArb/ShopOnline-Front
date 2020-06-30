import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Supplier } from './supplier';
import { SupplierService } from './supplier.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  suppliers: Supplier[] = [];
  supplierPaginator: any;
  filterPost='';
  actualPage: number = 0;
  searched: string = '';
  noResults: boolean = false;
  filterActive: boolean = false;

  constructor(private supplierService: SupplierService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
/*     this.supplierService.getSuppliers().subscribe (
      suppliers => this.suppliers = suppliers
    ); */
    this.getSuppliersPerPage();
  }

  getSuppliersPerPage(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      this.actualPage = page;
      if(!page) {
        page = 0;
      }
      this.supplierService
        .getSuppliersPerPage(page)
        .subscribe(response => {
          this.suppliers = response.content as Supplier[];
          this.supplierPaginator = response;
        });
    });
  }

  findSupplierByName(name: string): void {
    this.supplierService.getSupplierbyName(name).subscribe (
      suppliers => this.suppliers = suppliers
    );

    if(!this.suppliers.length){
      this.noResults = true;
      this.searched = name;
      console.log(this.noResults);
    }
    
  }

  noFilter(): void {
    this.router.navigate(['/suppliers/page/0']);
    this.filterPost = '';
    this.noResults = false;
    this.searched = '';
    this.getSuppliersPerPage();
    this.filterActive = false;

  }

}
