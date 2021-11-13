import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservarMesaPage } from './reservar-mesa.page';

const routes: Routes = [
  {
    path: '',
    component: ReservarMesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservarMesaPageRoutingModule {}
