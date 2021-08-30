import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss'],
})
export class ModalConfirmationComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() cancelText = 'NO';
  @Input() submitText = 'YES';
  @Input() messageClass = 'modal-message';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  submit() {
    this.dismiss({ confirm: true });
  }
}
