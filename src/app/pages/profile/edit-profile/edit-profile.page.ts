import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { GlobalService, RxValidatorService } from '@shared/services';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  fg: FormGroup;
  userData = {
    full_name: 'Sapri Sikidipapap',
    email: 'email@email.com',
    phone: '081388355240',
  };

  constructor(
    private validatorSrv: RxValidatorService,
    private fb: FormBuilder,
    private router: Router,
    private gs: GlobalService,
    private translateSrv: TranslateService
  ) {
    this.initProfileForm(this.userData);
  }

  ngOnInit() {}

  initProfileForm(user) {
    this.validatorSrv.validatorErrorMessage();
    this.fg = this.fb.group({
      full_name: [user?.full_name, [RxwebValidators.required()]],
      email: [user?.email, [RxwebValidators.required(), RxwebValidators.email()]],
      phone: [
        user?.phone,
        [
          RxwebValidators.required(),
          RxwebValidators.numeric(),
          RxwebValidators.minLength({ value: 7, message: `${this.translateSrv.get('VALIDATOR_MIN')} 7` }),
          RxwebValidators.maxLength({ value: 15, message: `${this.translateSrv.get('VALIDATOR_MAX')} 15` }),
        ],
      ],
    });
  }

  updateProfile() {
    if (this.fg.valid) {
      const data = this.getDirtyValues();
      console.log('data: ', data);
      this.router.navigate(['/tabs/profile']);
    }
  }

  getDirtyValues() {
    return this.gs.getChangedFormProperties(this.fg);
  }
}
