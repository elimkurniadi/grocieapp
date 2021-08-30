import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { GlobalService, RxValidatorService, ToastService } from '@shared/services';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { ActionSheetController, ModalController, NavController, Platform } from '@ionic/angular';
import { PaymentProofSuccessComponent } from '../payment-proof-success/payment-proof-success.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@shared/services/modules';

@Component({
  selector: 'app-payment-proof',
  templateUrl: './payment-proof.component.html',
  styleUrls: ['./payment-proof.component.scss'],
})
export class PaymentProofComponent implements OnInit {
  fg: FormGroup;
  selectedImage: any = null;
  orderId: any;
  previousUrl: string;
  isOnFetch = false;
  backButton: any;

  constructor(
    private validatorSrv: RxValidatorService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private gs: GlobalService,
    private router: Router,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private transactionSrv: TransactionService,
    private toastSrv: ToastService,
    private navCtrl: NavController,
    private platform: Platform
  ) {
    this.route.params.subscribe((param) => {
      if (param.id) {
        this.orderId = param.id;
        this.previousUrl = `/my-order/${param.id}/detail`;
      }
    });
    this.buildPaymentForm();
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.observeFetchState();

    this.backButton = this.platform.backButton.subscribeWithPriority(20, () => {
      this.goBack();
    });
  }

  ionViewDidLeave() {
    this.backButton.unsubscribe();
  }

  goBack() {
    this.navCtrl.navigateBack(this.previousUrl);
  }

  observeFetchState() {
    this.gs.observeOnFetch().subscribe((value: boolean) => {
      this.isOnFetch = value;
    });
  }

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
    if (this.fg.valid) {
      this.getBlobFile(this.selectedImage).then((img) => {
        const body = {
          image: img,
          payment_name: this.fg.value.name,
          payment_bank: this.fg.value.bank_name,
        };

        this.transactionSrv
          .uploadPaymentProof(this.orderId, body)
          .then((res) => {
            this.paymentSentModal();
          })
          .catch((err) => {
            const error = err.error.error;
            this.toastSrv.show(error.message);
          });
      });
    } else {
      this.gs.markDirtyForm(this.fg);
    }
  }
  async paymentSentModal() {
    const modal = await this.modalCtrl.create({
      component: PaymentProofSuccessComponent,
    });

    modal.onDidDismiss().then((res: any) => {
      this.router.navigate(['/tabs', 'home']);
    });

    return await modal.present();
  }
}
