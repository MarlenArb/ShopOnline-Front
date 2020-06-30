import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { CformComponent } from './client/cform.component';
import { ShopComponent } from './shop/shop.component';
import { SformComponent } from './shop/sform.component';
import { ProductComponent } from './product/product.component';
import { PformComponent } from './product/pform.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SuformComponent } from './supplier/suform.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    CformComponent,
    ShopComponent,
    SformComponent,
    ProductComponent,
    PformComponent,
    HeaderComponent,
    FooterComponent,
    SupplierComponent,
    SuformComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
