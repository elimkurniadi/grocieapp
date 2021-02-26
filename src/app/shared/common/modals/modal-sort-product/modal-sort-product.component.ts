import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@shared/pipes/translate/translate.service';

@Component({
  selector: 'app-modal-sort-product',
  templateUrl: './modal-sort-product.component.html',
  styleUrls: ['./modal-sort-product.component.scss'],
})
export class ModalSortProductComponent implements OnInit {
  radioOptions: any[];
  @Input() option: any;
  constructor(private modalCtrl: ModalController, private translate: TranslateService) {}

  ngOnInit() {
    this.setRadioOptions();
  }

  setRadioOptions() {
    this.radioOptions = [
      {
        label: this.translate.get('POPULARITY'),
        value: 'popularity',
        orderBy: 'hit_count',
        orderType: 'desc',
      },
      {
        label: this.translate.get('LOWEST_TO_HIGHEST_PRICE'),
        value: 'lowest_price',
        orderBy: 'price',
        orderType: 'asc',
      },
      {
        label: this.translate.get('HIGHEST_TO_LOWEST_PRICE'),
        value: 'highest_price',
        orderBy: 'price',
        orderType: 'desc',
      },
      {
        label: 'A-Z',
        value: 'name_asc',
        orderBy: 'name',
        orderType: 'asc',
      },
      {
        label: 'Z-A',
        value: 'name_desc',
        orderBy: 'name',
        orderType: 'desc',
      },
    ];
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  apply() {
    if (this.option !== '' && this.option !== undefined) {
      const optionSelected = this.radioOptions.filter((option) => {
        return option.value === this.option;
      });

      this.dismiss({ value: this.option, order: optionSelected[0] });
    }
  }
}
