import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroMesaPage } from './registro-mesa.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroMesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroMesaPageRoutingModule {}
