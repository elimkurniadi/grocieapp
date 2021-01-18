import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-favorite-new',
  templateUrl: './favorite-new.component.html',
  styleUrls: ['./favorite-new.component.scss'],
})
export class FavoriteNewComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
