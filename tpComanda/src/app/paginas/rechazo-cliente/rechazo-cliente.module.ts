import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechazoClientePageRoutingModule } from './rechazo-cliente-routing.module';

import { RechazoClientePage } from './rechazo-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechazoClientePageRoutingModule
  ],
  declarations: [RechazoClientePage]
})
export class RechazoClientePageModule {}
