import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.scss'],
})
export class ModalUpdateComponent implements OnInit {
  @Input() appVersion: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  submit() {
    this.dismiss({ confirm: true });
  }
}
