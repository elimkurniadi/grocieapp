import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastService } from '@shared/services';
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
  constructor(private navCtrl: NavController, private addressSrv: AddressService, private toast: ToastService) {}

  ngOnInit() {}

  onUseAddress(data, event) {
    event.stopPropagation();
    if (!data.is_default) {
      this.setAsDefaultAddress(data?.address_id);
    }
  }

  setAsDefaultAddress(id) {
    this.addressSrv.setDefaultAddress(id).then((res) => {
      this.toast.show(res?.response);
      this.isSelectMode ? this.navCtrl.back() : this.action.emit();
    });
  }
}
