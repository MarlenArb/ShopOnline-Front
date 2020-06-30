import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ShopService } from './shop.service';
import { Shop } from './shop';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-sform',
  templateUrl: './sform.component.html',
  styleUrls: ['./sform.component.css']
})
export class SformComponent implements OnInit {

  public shop: Shop = new Shop();

  constructor(public shopService: ShopService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadShop();
  }


  //Añadir tienda
  public addShop(): void {
    this.shopService.addShop(this.shop).subscribe(
      shop => {
        this.router.navigate(['/shops/page/0'])
        Swal.fire('Nueva tienda', `Nueva tienda creada con éxito!`, 'success');
      }
    )
  }

  //Buscar tienda por id
  loadShop(): void {
    this.activatedRoute.params.subscribe(params => {
      let idShop = params['idShop']
      if (idShop) {
        this.shopService.getShop(idShop).subscribe((shop) => this.shop = shop)
      }
    })
  }


  modifyShop(): void {
    this.shopService.modifyShop(this.shop).subscribe(
      shop => {
        this.router.navigate(['/shops/page/0'])
        Swal.fire('Tienda Actualizada', `Tienda ${this.shop.shopName} actualizada con éxito`, 'success')
      }
    )
  }

    //Borrar tienda
    deleteShop( shop: Shop) :void{
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar la tienda ${shop.shopName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, eliminar!',
        cancelButtonText: '¡No, cancelar!',
        cancelButtonColor: '#8f7c81',
        confirmButtonColor: '#ff005e',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.shopService.deleteShop(shop.idShop).subscribe(
            response => {
              this.router.navigate(['/shops/page/0']);
              Swal.fire(
                '¡Eliminada!',
                `La tienda ${shop.shopName} ha sido eliminada con éxito`,
                'success'
              )
            } 
          )
        }
      })
    }

  return(): void {
    this.router.navigate(['/shops/page/0']);
  }

}
