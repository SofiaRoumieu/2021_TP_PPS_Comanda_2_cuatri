import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPedidosBarPage } from './lista-pedidos-bar.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPedidosBarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPedidosBarPageRoutingModule {}
