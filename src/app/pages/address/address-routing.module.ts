import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressFormComponent } from './address-form/address-form.component';

import { AddressPage } from './address.page';

const routes: Routes = [
  {
    path: '',
    component: AddressPage,
  },
  {
    path: 'form',
    component: AddressFormComponent,
  },
  {
    path: 'form/:id',
    component: AddressFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressPageRoutingModule {}
