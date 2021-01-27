import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-email-verification',
  templateUrl: './modal-email-verification.component.html',
  styleUrls: ['./modal-email-verification.component.scss'],
})
export class ModalEmailVerificationComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
