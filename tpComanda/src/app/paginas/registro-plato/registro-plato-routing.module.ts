import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroPlatoPage } from './registro-plato.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroPlatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPlatoPageRoutingModule {}
