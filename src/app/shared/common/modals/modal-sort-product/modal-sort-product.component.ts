import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@shared/pipes/translate/translate.service';

@Component({
  selector: 'app-modal-sort-product',
  templateUrl: './modal-sort-product.component.html',
  styleUrls: ['./modal-sort-product.component.scss'],
})
export class ModalSortProductComponent implements OnInit {
  radioOptions: any[];
  option: string;
  constructor(private modalCtrl: ModalController, private translate: TranslateService) {}

  ngOnInit() {
    this.setRadioOptions();
  }

  setRadioOptions() {
    this.radioOptions = [
      {
        label: this.translate.get('POPULARITY'),
        value: 'popularity',
      },
      {
        label: this.translate.get('LOWEST_TO_HIGHEST_PRICE'),
        value: 'lowest_price',
      },
      {
        label: this.translate.get('HIGHEST_TO_LOWEST_PRICE'),
        value: 'highest_price',
      },
      {
        label: 'A-Z',
        value: 'name_asc',
      },
      {
        label: 'Z-A',
        value: 'name_desc',
      },
    ];
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
