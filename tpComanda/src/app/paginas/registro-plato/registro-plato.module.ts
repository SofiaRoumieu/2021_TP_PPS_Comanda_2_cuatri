import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPlatoPageRoutingModule } from './registro-plato-routing.module';

import { RegistroPlatoPage } from './registro-plato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistroPlatoPageRoutingModule
  ],
  declarations: [RegistroPlatoPage]
})
export class RegistroPlatoPageModule {}
