import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnvioDomicilioPage } from './envio-domicilio.page';

const routes: Routes = [
  {
    path: '',
    component: EnvioDomicilioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvioDomicilioPageRoutingModule {}
