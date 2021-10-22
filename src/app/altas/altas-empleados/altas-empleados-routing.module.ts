import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltasEmpleadosPage } from './altas-empleados.page';

const routes: Routes = [
  {
    path: '',
    component: AltasEmpleadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltasEmpleadosPageRoutingModule {}
