import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPedidosMozoPage } from './lista-pedidos-mozo.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPedidosMozoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPedidosMozoPageRoutingModule {}
