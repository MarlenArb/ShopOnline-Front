import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier';

@Component({
  selector: 'app-suform',
  templateUrl: './suform.component.html',
  styleUrls: ['./suform.component.css']
})
export class SuformComponent implements OnInit {

  public supplier: Supplier = new Supplier();

  constructor(public supplierService: SupplierService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadSupplier()}

  //Añadir proveedor
  public addSupplier(): void {
    this.supplierService.addSupplier(this.supplier).subscribe(
      supplier => {
        this.router.navigate(['/suppliers/page/0'])
        Swal.fire('Nuevo proveedor', `Nuevo proveedor creado con éxito!`, 'success');
      }
    )
  }

  //Buscar proveedor por id
  loadSupplier(): void {
    this.activatedRoute.params.subscribe(params => {
      let idSupplier = params['idSupplier']
      if (idSupplier) {
        this.supplierService.getSupplier(idSupplier).subscribe((supplier) => this.supplier = supplier)
      }
    })
  }


  //Modidfica proveedor
  modifySupplier(): void {
    this.supplierService.modifySupplier(this.supplier).subscribe(
      supplier => {
        this.router.navigate(['/suppliers/page/0'])
        Swal.fire('Proveedor Actualizado', `Proveedor actualizado con éxito`, 'success')
      }
    )
  }

    //Borrar proveedor
    deleteSupplier( supplier: Supplier) :void{
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar el proveedor ${supplier.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, eliminar!',
        cancelButtonText: '¡No, cancelar!',
        cancelButtonColor: '#8f7c81',
        confirmButtonColor: '#ff005e',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.supplierService.deleteSupplier(supplier.idSupplier).subscribe(
            response => {
              this.router.navigate(['/suppliers/page/0']);
              Swal.fire(
                '¡Eliminado!',
                `El proveedor ${supplier.name} ha sido eliminado con éxito`,
                'success'
              )
            } 
          )
        }
      })
    }

  return(): void {
    this.router.navigate(['/suppliers/page/0']);
  }

}
