import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiPedidoPageRoutingModule } from './mi-pedido-routing.module';

import { MiPedidoPage } from './mi-pedido.page';
import { EstadoPipe } from 'src/app/pipes/estado.pipe';
import { DescuentoPipe } from 'src/app/pipes/descuento.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiPedidoPageRoutingModule
  ],
  declarations: [
    MiPedidoPage,
    EstadoPipe,
    DescuentoPipe
  ]
})
export class MiPedidoPageModule {}
