import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteEsperaPageRoutingModule } from './cliente-espera-routing.module';

import { ClienteEsperaPage } from './cliente-espera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteEsperaPageRoutingModule
  ],
  declarations: [ClienteEsperaPage]
})
export class ClienteEsperaPageModule {}
