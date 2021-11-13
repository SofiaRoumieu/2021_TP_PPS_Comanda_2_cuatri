import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAdmPageRoutingModule } from './registro-adm-routing.module';

import { RegistroAdmPage } from './registro-adm.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroAdmPageRoutingModule
  ],
  declarations: [RegistroAdmPage]
})
export class RegistroAdmPageModule {}
