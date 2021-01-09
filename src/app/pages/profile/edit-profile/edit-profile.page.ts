import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { GlobalService, RxValidatorService } from '@shared/services';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  fg: FormGroup;

  constructor(
    private validatorSrv: RxValidatorService,
    private fb: FormBuilder,
    private router: Router,
    private gs: GlobalService
  ) {}

  ngOnInit() {}

  initProfileForm(user) {
    this.validatorSrv.validatorErrorMessage();
    this.fg = this.fb.group({
      full_name: [user?.full_name, [RxwebValidators.required()]],
      email: [user?.email, [RxwebValidators.required(), RxwebValidators.email()]],
      phone: [user?.phone, [RxwebValidators.required(), RxwebValidators.numeric()]],
    });
  }
}
