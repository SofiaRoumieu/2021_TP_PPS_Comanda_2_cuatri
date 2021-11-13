import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaCobrosPage } from './lista-cobros.page';

const routes: Routes = [
  {
    path: '',
    component: ListaCobrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaCobrosPageRoutingModule {}
