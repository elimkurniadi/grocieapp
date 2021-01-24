import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add-to-favorite',
  templateUrl: './modal-add-to-favorite.component.html',
  styleUrls: ['./modal-add-to-favorite.component.scss'],
})
export class ModalAddToFavoriteComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
