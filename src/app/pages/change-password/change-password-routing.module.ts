import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestOtpComponent } from './request-otp/request-otp.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'request-otp/forgot-password',
    pathMatch: 'full',
  },
  {
    path: 'request-otp/:type',
    component: RequestOtpComponent,
  },
  {
    path: 'verify-otp',
    component: VerifyOtpComponent,
  },
  {
    path: 'set-password',
    component: SetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePasswordPageRoutingModule {}
