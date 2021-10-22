import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltasDuenioPage } from './altas-duenio.page';

const routes: Routes = [
  {
    path: '',
    component: AltasDuenioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltasDuenioPageRoutingModule {}
