import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { GlobalService, RxValidatorService, ToastService } from '@shared/services';
import { UserService } from '@shared/services/modules';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  fg: FormGroup;
  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50,
  };
  selectedImage: any = null;
  currDate: any;

  constructor(
    private validatorSrv: RxValidatorService,
    private fb: FormBuilder,
    private router: Router,
    private gs: GlobalService,
    private translateSrv: TranslateService,
    private userSrv: UserService,
    private camera: Camera,
    private file: File,
    private actionSheetCtrl: ActionSheetController,
    private toastSrv: ToastService
  ) {
    this.userSrv.getProfile().then((res) => {
      this.currDate = new Date();
      this.initProfileForm(res);
    });
  }

  ngOnInit() {}

  initProfileForm(user) {
    this.selectedImage = user?.profile_picture
      ? user?.profile_picture + `?${this.currDate.toString()}`
      : 'https://via.placeholder.com/35.png?text=LOGO+Placeholder';
    this.validatorSrv.validatorErrorMessage();
    this.fg = this.fb.group({
      profile_picture: [user?.profile_picture ? user?.profile_picture + `?${this.currDate.toString()}` : null],
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
      delete this.fg.value.profile_picture;
      const data = this.getDirtyValues();
      this.userSrv.updateProfile(data).then(() => {
        this.router.navigate(['/tabs/profile']);
      });
    }
  }

  updateProfilePicture(image: any) {
    const data = {
      image,
    };

    this.userSrv
      .updateProfilePicture(data)
      .then((res) => {
        // this.router.navigate(['/tabs/profile']);
        this.toastSrv.show('Photo updated successfully');
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  getDirtyValues() {
    return this.gs.getChangedFormProperties(this.fg);
  }

  async showActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `${this.translateSrv.get('SELECT_IMAGE_SOURCE')}`,
      buttons: [
        {
          text: `${this.translateSrv.get('CHOOSE_FROM_GALLERY')}`,
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: `${this.translateSrv.get('TAKE_A_PHOTO')}`,
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
      correctOrientation: true,
    };

    this.camera.getPicture(options).then((imageData) => {
      const image = `data:image/jpeg;base64,${imageData}`;
      this.setImageToForm(image);

      this.getBlobFile(image).then((data) => {
        this.updateProfilePicture(data);
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
    this.fg.controls.profile_picture.patchValue(image);
    this.fg.controls.profile_picture.markAsDirty();
  }
}
