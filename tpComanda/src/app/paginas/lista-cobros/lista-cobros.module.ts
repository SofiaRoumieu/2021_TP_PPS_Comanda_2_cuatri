import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaCobrosPageRoutingModule } from './lista-cobros-routing.module';

import { ListaCobrosPage } from './lista-cobros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaCobrosPageRoutingModule
  ],
  declarations: [ListaCobrosPage]
})
export class ListaCobrosPageModule {}
