import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltasEmpleadosPageRoutingModule } from './altas-empleados-routing.module';

import { AltasEmpleadosPage } from './altas-empleados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltasEmpleadosPageRoutingModule
  ],
  declarations: [AltasEmpleadosPage]
})
export class AltasEmpleadosPageModule {}
