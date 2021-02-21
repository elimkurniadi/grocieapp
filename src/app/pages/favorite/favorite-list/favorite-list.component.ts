import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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
    private toastSrv: ToastService,
    private alertCtrl: AlertController
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
      if (data?.success) {
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

  delete(item) {
    console.log(item);
    this.presentAlertConfirm(item);
  }

  async presentAlertConfirm(item) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Delete List',
      message: 'Are you sure you want to delete' + '<strong> ' + item.name + '</strong> ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'modal-confirm',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          cssClass: 'modal-confirm',
          handler: () => {
            this.favoriteSrv.deleteFavoriteList(item.favourite_group_id).then(res => {
              this.getFavorites();
            })
          }
        }
      ]
    });

    await alert.present();
  }
}
