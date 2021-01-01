import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterStepTwoComponent } from './register-step-two/register-step-two.component';

import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
  },
  {
    path: 'step-two',
    component: RegisterStepTwoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
