import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastService } from '@shared/services';
import { UserService } from '@shared/services/modules';

@Component({
  selector: 'app-modal-email-verification',
  templateUrl: './modal-email-verification.component.html',
  styleUrls: ['./modal-email-verification.component.scss'],
})
export class ModalEmailVerificationComponent implements OnInit {
  constructor(private modalCtrl: ModalController, private userSrv: UserService, private toastSrv: ToastService) {}

  ngOnInit() {
    // this.requestVerification();
  }

  requestVerification() {
    this.userSrv
      .sendEmailVerification()
      .then(() => {})
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
        this.dismiss();
      });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
