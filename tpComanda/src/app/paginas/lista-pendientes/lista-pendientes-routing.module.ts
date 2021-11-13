import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPendientesPage } from './lista-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPendientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPendientesPageRoutingModule {}
