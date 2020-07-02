import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from './product';
import { ProductService } from './product.service';
import { Supplier } from '../supplier/supplier';
import { SupplierService } from '../supplier/supplier.service';

@Component({
  selector: 'app-pform',
  templateUrl: './pform.component.html',
  styleUrls: ['./pform.component.css']
})
export class PformComponent implements OnInit {

  public product: Product = new Product();
  public suppliers: Supplier[] = [];

  public productsTypes: String[] = ["Camiseta", "Jeans", "Chaqueta", "Bufanda", "Zapatos", "Falda", "Vestido",
  "Diadema"];

  constructor(public productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.loadProduct();

    this.supplierService.getSuppliers().subscribe (
      suppliers => this.suppliers = suppliers
    );

  }


  //Añadir producto
  public addProduct(): void {
    this.productService.addProduct(this.product).subscribe(
      product => {
        this.router.navigate(['/products/page/0'])
        Swal.fire('Nuevo producto', `Nuevo producto creado con éxito!`, 'success');
      }
    )
  }

  //Buscar producto por id
  loadProduct(): void {
    this.activatedRoute.params.subscribe(params => {
      let idProduct = params['idProduct']
      if (idProduct) {
        this.productService.getProduct(idProduct).subscribe((product) => this.product = product)
      }
    })
  }


  //Modidfica producto
  modifyProduct(): void {
    
    this.productService.modifyProduct(this.product).subscribe(
      product => {
        console.log("Hola" + this.product);
        this.router.navigate(['/products/page/0'])
        Swal.fire('Producto Actualizado', `Producto ${this.product.productName} actualizado con éxito`, 'success')
      }
    )
  }

    //Borrar producto
    deleteProduct( product: Product) :void{
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar el producto ${product.productName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, eliminar!',
        cancelButtonText: '¡No, cancelar!',
        cancelButtonColor: '#8f7c81',
        confirmButtonColor: '#ff005e',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.productService.deleteProduct(product.idProduct).subscribe(
            response => {
              this.router.navigate(['/products/page/0']);
              Swal.fire(
                '¡Eliminado!',
                `El producto ${product.productName} ha sido eliminado con éxito`,
                'success'
              )
            } 
          )
        }
      })
    }

  return(): void {
    this.router.navigate(['/product']);
  }

  public compareSuppliers(o1: Supplier, o2: Supplier): boolean {
    return o1 == null || o2 == null ? false : o1.name == o2.name;
  }

  public compareTypes(o1: string, o2: string): boolean {
    return o1 == null || o2 == null ? false : o1 == o2;
  }

}
