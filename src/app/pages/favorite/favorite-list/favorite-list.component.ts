import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FavoriteNewComponent } from '../favorite-new/favorite-new.component';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
})
export class FavoriteListComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async addToList() {
    const modal = await this.modalCtrl.create({
      component: FavoriteNewComponent,
      cssClass: 'modal-add-favorite',
    });

    modal.onDidDismiss().then(() => {
      // Refresh data
    });

    return await modal.present();
  }
}
