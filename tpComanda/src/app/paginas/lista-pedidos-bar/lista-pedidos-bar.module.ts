import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPedidosBarPageRoutingModule } from './lista-pedidos-bar-routing.module';

import { ListaPedidosBarPage } from './lista-pedidos-bar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPedidosBarPageRoutingModule
  ],
  declarations: [ListaPedidosBarPage]
})
export class ListaPedidosBarPageModule {}
