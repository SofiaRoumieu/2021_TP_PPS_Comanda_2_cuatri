import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechazoClientePage } from './rechazo-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: RechazoClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechazoClientePageRoutingModule {}
