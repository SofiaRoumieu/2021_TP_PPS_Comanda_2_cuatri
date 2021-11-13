import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroAdmPage } from './registro-adm.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroAdmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroAdmPageRoutingModule {}
