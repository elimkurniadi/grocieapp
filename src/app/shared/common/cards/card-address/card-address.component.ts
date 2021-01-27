import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { ToastService } from '@shared/services';
import { AlertService } from '@shared/services/alert.service';
import { AddressService } from '@shared/services/modules';

@Component({
  selector: 'app-card-address',
  templateUrl: './card-address.component.html',
  styleUrls: ['./card-address.component.scss'],
})
export class CardAddressComponent implements OnInit {
  @Input() addressList = null;
  @Input() isSelectMode = true;
  @Output() action = new EventEmitter();
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private addressSrv: AddressService,
    private toast: ToastService,
    private alertSrv: AlertService,
    private translateSrv: TranslateService
  ) {}

  ngOnInit() {}

  onUseAddress(data, event) {
    event.stopPropagation();
    if (!data.is_default) {
      this.setAsDefaultAddress(data?.address_id);
    }
  }

  onAddressClick(id, event) {
    event.stopPropagation();
    if (!this.isSelectMode) {
      this.router.navigate([`/address/form/${id}`]);
    }
  }

  setAsDefaultAddress(id) {
    this.addressSrv.setDefaultAddress(id).then((res) => {
      this.toast.show(res?.response);
      this.isSelectMode ? this.navCtrl.back() : this.action.emit();
    });
  }

  showAlertDelete(id, event) {
    event.stopPropagation();
    this.alertSrv.presentAlert({
      message: `${this.translateSrv.get('DELETE_ADDRESS_CONFIRM')}`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.deleteAddress(id);
          },
        },
        { text: `${this.translateSrv.get('CANCEL')}`, role: 'cancel' },
      ],
    });
  }

  deleteAddress(id) {
    this.addressSrv.deleteAddress(id).then(() => {
      this.action.emit();
    });
  }
}
