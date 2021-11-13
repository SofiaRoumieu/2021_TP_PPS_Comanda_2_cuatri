import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservarMesaPageRoutingModule } from './reservar-mesa-routing.module';

import { ReservarMesaPage } from './reservar-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservarMesaPageRoutingModule
  ],
  declarations: [ReservarMesaPage]
})
export class ReservarMesaPageModule {}
