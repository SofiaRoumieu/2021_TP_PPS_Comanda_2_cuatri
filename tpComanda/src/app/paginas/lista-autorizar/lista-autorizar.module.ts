import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAutorizarPageRoutingModule } from './lista-autorizar-routing.module';

import { ListaAutorizarPage } from './lista-autorizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAutorizarPageRoutingModule
  ],
  declarations: [ListaAutorizarPage]
})
export class ListaAutorizarPageModule {}
