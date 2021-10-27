import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltasProductoPageRoutingModule } from './altas-producto-routing.module';

import { AltasProductoPage } from './altas-producto.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AltasProductoPageRoutingModule
  ],
  declarations: [AltasProductoPage]
})
export class AltasProductoPageModule {}
