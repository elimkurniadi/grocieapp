import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-setting',
  templateUrl: './modal-setting.component.html',
  styleUrls: ['./modal-setting.component.scss'],
})
export class ModalSettingComponent implements OnInit {
  @Input() title: string;
  @Input() content: any;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
