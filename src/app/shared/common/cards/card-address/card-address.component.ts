import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  selectedAddressId: any;

  constructor(
    private navCtrl: NavController,
    private addressSrv: AddressService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((param) => {
      if (param.address_id) {
        this.selectedAddressId = param.address_id;
      } else {
        this.selectedAddressId = null;
      }
    });
  }

  ngOnInit() {}

  onUseAddress(data, event) {
    event.stopPropagation();
    if (!data.is_default) {
      this.setAsDefaultAddress(data?.address_id);
    }
  }

  setAsDefaultAddress(id) {
    if (this.isSelectMode) {
      this.router.navigate(['/checkout'], { queryParams: { address_id: id }, replaceUrl: true });
    } else {
      this.addressSrv.setDefaultAddress(id).then((res) => {
        this.toast.show(res?.response);
        this.action.emit();
      });
    }
  }
}
