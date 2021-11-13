import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPendientesPageRoutingModule } from './lista-pendientes-routing.module';

import { ListaPendientesPage } from './lista-pendientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPendientesPageRoutingModule
  ],
  declarations: [ListaPendientesPage]
})
export class ListaPendientesPageModule {}
