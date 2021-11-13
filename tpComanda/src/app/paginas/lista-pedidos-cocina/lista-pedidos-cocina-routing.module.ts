import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPedidosCocinaPage } from './lista-pedidos-cocina.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPedidosCocinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPedidosCocinaPageRoutingModule {}
