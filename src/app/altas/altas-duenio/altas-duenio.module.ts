import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltasDuenioPageRoutingModule } from './altas-duenio-routing.module';

import { AltasDuenioPage } from './altas-duenio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltasDuenioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AltasDuenioPage]
})
export class AltasDuenioPageModule {}
