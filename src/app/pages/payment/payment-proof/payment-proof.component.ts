import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { GlobalService, RxValidatorService } from '@shared/services';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-payment-proof',
  templateUrl: './payment-proof.component.html',
  styleUrls: ['./payment-proof.component.scss'],
})
export class PaymentProofComponent implements OnInit {
  fg: FormGroup;
  selectedImage: any = null;

  constructor(
    private validatorSrv: RxValidatorService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private gs: GlobalService
  ) {
    this.buildPaymentForm();
  }

  ngOnInit() {}

  buildPaymentForm() {
    this.validatorSrv.validatorErrorMessage();

    this.fg = this.fb.group({
      name: [null, [RxwebValidators.required()]],
      bank_name: [null, [RxwebValidators.required()]],
      payment_proof: [null, [RxwebValidators.required()]],
    });
  }
  async showActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `${this.translate.get('SELECT_IMAGE_SOURCE')}`,
      buttons: [
        {
          text: `${this.translate.get('CHOOSE_FROM_GALLERY')}`,
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: `${this.translate.get('TAKE_A_PHOTO')}`,
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          },
        },
      ],
    });

    await actionSheet.present();
  }

  pickImage(type) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: type,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then((imageData) => {
      const image = `data:image/jpeg;base64,${imageData}`;
      this.setImageToForm(image);

      this.getBlobFile(image).then((data) => {
        this.gs.log('file', data);
      });
    });
  }

  getBlobFile(imgpath) {
    return new Promise((resolve, reject) => {
      fetch(imgpath)
        .then((res) => res.blob())
        .then(
          (data) => {
            const file = new Blob([data], { type: 'image/jpeg' });
            resolve(file);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  setImageToForm(image) {
    this.selectedImage = image;
    this.fg.controls.payment_proof.patchValue(image);
    this.fg.controls.payment_proof.markAsDirty();
  }

  submit() {
    console.log('submitted');
  }
}
