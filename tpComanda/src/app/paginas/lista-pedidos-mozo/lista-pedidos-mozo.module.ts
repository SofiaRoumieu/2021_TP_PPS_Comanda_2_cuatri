import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPedidosMozoPageRoutingModule } from './lista-pedidos-mozo-routing.module';

import { ListaPedidosMozoPage } from './lista-pedidos-mozo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPedidosMozoPageRoutingModule
  ],
  declarations: [ListaPedidosMozoPage]
})
export class ListaPedidosMozoPageModule {}
