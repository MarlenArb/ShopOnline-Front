import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

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
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { OformComponent } from './order/oform.component';
import { ShopService } from './shop/shop.service';
import { ClientService } from './client/client.service';
import { SupplierService } from './supplier/supplier.service';
import { ProductService } from './product/product.service';
import { OrderService } from './order/order.service';
import { ClientPaginatorComponent } from './paginator/client-paginator/client-paginator.component';
import { ShopPaginatorComponent } from './paginator/shop-paginator/shop-paginator.component';
import { OrderPaginatorComponent } from './paginator/order-paginator/order-paginator.component';
import { SupplierPaginatorComponent } from './paginator/supplier-paginator/supplier-paginator.component';
import { ProductPaginatorComponent } from './paginator/product-paginator/product-paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopOrgChartComponent } from './shop-org-chart/shop-org-chart.component';
import { MakeOrdersComponent } from './make-orders/make-orders.component';
import { ShopInterfaceComponent } from './shop/shop-interface/shop-interface.component';
import { ShopMainPageComponent } from './shop-main-page/shop-main-page.component';


/* Angular Material Modules used */
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';

/* Primeng Modules used */
import {ButtonModule} from 'primeng/button';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {PickListModule} from 'primeng/picklist';
import {TreeModule} from 'primeng/tree';
import { DataService } from './shop/shop-interface/data.service';
import {ColorPickerModule} from 'primeng/colorpicker';
import {CarouselModule} from 'primeng/carousel';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {ChartModule} from 'primeng/chart';


registerLocaleData(localeEs, 'es');

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {path: 'home', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'shoporg', component: ShopOrgChartComponent},
  {path: 'shop/form', component: SformComponent},
  {path: 'shop/form/:idShop', component: SformComponent},

  {path: 'tiendas', component: ShopInterfaceComponent},
  {path: 'tiendas/:idShop', component: ShopMainPageComponent},

  {path: 'client', component: ClientComponent},
  {path: 'client/form', component: CformComponent},
  {path: 'client/form/:idClient', component: CformComponent},
  {path: 'product', component: ProductComponent},
  {path: 'product/form', component: PformComponent},
  {path: 'product/form/:idProduct', component: PformComponent},
  {path: 'order', component: OrderComponent},
  {path: 'makeorder', component: MakeOrdersComponent},
  {path: 'order/form', component: OformComponent},
  {path: 'order/form/:idOrder', component: OformComponent},
  {path: 'supplier', component: SupplierComponent},
  {path: 'supplier/form', component: SuformComponent},
  {path: 'supplier/form/:idSupplier', component: SuformComponent},

  { path: "clients/page/:page", component: ClientComponent},
  { path: "clients/page/:page/:clientName", component: ClientComponent},

  { path: "shops/page/:page", component: ShopComponent},
  { path: "shops/page/:page/:shopName", component: ShopComponent},

  { path: "products/page/:page", component: ProductComponent},
  { path: "products/page/:page/:productName", component: ProductComponent},

  { path: "orders/page/:page", component: OrderComponent},
  { path: "orders/page/:page/:orderName", component: OrderComponent},

  { path: "suppliers/page/:page", component: SupplierComponent},
  { path: "suppliers/page/:page/:name", component: SupplierComponent},

  ]
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
    SuformComponent,
    HomeComponent,
    OrderComponent,
    OformComponent,
    ClientPaginatorComponent,
    ShopPaginatorComponent,
    OrderPaginatorComponent,
    SupplierPaginatorComponent,
    ProductPaginatorComponent,
    ShopOrgChartComponent,
    MakeOrdersComponent,
    ShopInterfaceComponent,
    ShopMainPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    ButtonModule,
    OrganizationChartModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    PickListModule,
    ColorPickerModule,
    TreeModule,
    CarouselModule,
    ToastModule,
    MatTooltipModule,
    ChartModule
  ],
  providers: [ShopService, ClientService, SupplierService, ProductService, OrderService, DataService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
