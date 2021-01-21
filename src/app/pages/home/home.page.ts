import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { Router } from '@angular/router';
import { AuthService, ExampleService, GlobalService } from '@shared/services';
import { ModalController } from '@ionic/angular';
import { ModalLocationComponent } from '@shared/common/modals/modal-location/modal-location.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  selectedLanguage: any = 'id';
  banners = [
    {
      source: 'https://via.placeholder.com/360x203.png?text=Promotional+Banner',
    },

    {
      source: 'https://via.placeholder.com/360x203.png?text=Promotional+Banner',
    },
    {
      source: null,
    },
  ];

  constructor(
    private translate: TranslateService,
    private router: Router,
    private authSrv: AuthService,
    private gs: GlobalService,
    private exampleSrv: ExampleService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    // this.getData();
  }

  getData() {
    this.exampleSrv.getData().subscribe((res) => {
      console.log('result', res);
    });
  }

  selectLang(lang) {
    this.selectedLanguage = lang;
    this.translate.setLanguage(lang);
  }

  searchProduct() {
    this.router.navigate(['/product', 'search']);
  }

  async changeLocation() {
    const modal = await this.modalCtrl.create({
      component: ModalLocationComponent,
    });

    modal.onDidDismiss().then(() => {
      // Refresh data
    });

    return await modal.present();
  }
}
