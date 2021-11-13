import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteEsperaPage } from './cliente-espera.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteEsperaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteEsperaPageRoutingModule {}
