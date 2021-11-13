import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnvioDomicilioPageRoutingModule } from './envio-domicilio-routing.module';

import { EnvioDomicilioPage } from './envio-domicilio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnvioDomicilioPageRoutingModule
  ],
  declarations: [EnvioDomicilioPage]
})
export class EnvioDomicilioPageModule {}
