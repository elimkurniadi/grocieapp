import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Favorite, Response } from '@shared/models';
import { ToastService } from '@shared/services';
import { FavoriteService } from '@shared/services/modules';
import { FavoriteNewComponent } from '../favorite-new/favorite-new.component';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
})
export class FavoriteListComponent implements OnInit {
  favorites: Favorite[];

  constructor(
    private modalCtrl: ModalController,
    private favoriteSrv: FavoriteService,
    private toastSrv: ToastService
  ) {}

  ngOnInit() {
    this.getFavorites();
  }

  async addToList() {
    const modal = await this.modalCtrl.create({
      component: FavoriteNewComponent,
      cssClass: 'modal-add-favorite',
    });

    modal.onDidDismiss().then((res: any) => {
      const data = res.data;
      if (data.success) {
        this.getFavorites();
      }
    });

    return await modal.present();
  }

  getFavorites() {
    this.favoriteSrv
      .getList()
      .then((res: Response) => {
        const favorites = res.response as Favorite[];
        this.favorites = favorites;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }
}
