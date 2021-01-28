import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { GlobalService, RxValidatorService, ToastService } from '@shared/services';
import { FavoriteService } from '@shared/services/modules';

@Component({
  selector: 'app-favorite-new',
  templateUrl: './favorite-new.component.html',
  styleUrls: ['./favorite-new.component.scss'],
})
export class FavoriteNewComponent implements OnInit {
  fg: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private validatorSrv: RxValidatorService,
    private fb: FormBuilder,
    private gs: GlobalService,
    private favoriteSrv: FavoriteService,
    private toastSrv: ToastService
  ) {}

  ngOnInit() {
    this.buildFavoriteForm();
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  buildFavoriteForm() {
    this.validatorSrv.validatorErrorMessage();

    this.fg = this.fb.group({
      name: [null, [RxwebValidators.required()]],
    });
  }

  saveFavorite() {
    if (this.fg.valid) {
      this.favoriteSrv
        .addData(this.fg.value)
        .then((res) => {
          this.dismiss({ success: true });
        })
        .catch((err) => {
          const error = err.error.error;
          this.toastSrv.show(error.message);
        });
    } else {
      this.gs.markDirtyForm(this.fg);
    }
  }
}
