import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAutorizarPage } from './lista-autorizar.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAutorizarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAutorizarPageRoutingModule {}
