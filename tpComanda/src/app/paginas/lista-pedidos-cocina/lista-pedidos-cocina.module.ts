import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPedidosCocinaPageRoutingModule } from './lista-pedidos-cocina-routing.module';

import { ListaPedidosCocinaPage } from './lista-pedidos-cocina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPedidosCocinaPageRoutingModule
  ],
  declarations: [ListaPedidosCocinaPage]
})
export class ListaPedidosCocinaPageModule {}
