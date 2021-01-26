import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from '@shared/services/modules';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  listAddress: any[] = null;

  selectMode = false;
  constructor(private activatedRoute: ActivatedRoute, private addressSrv: AddressService) {
    this.observeQueryParam();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.fetchAddressList();
  }

  observeQueryParam() {
    this.activatedRoute.queryParams.subscribe((param) => {
      const mode = param?.mode;
      mode && mode === 'select' ? (this.selectMode = true) : (this.selectMode = false);
    });
  }

  fetchAddressList(event = null) {
    this.addressSrv
      .getAddress()
      .then((res) => {
        this.listAddress = res;
        if (event) {
          event.target.complete();
        }
      })
      .catch(() => {
        event.target.complete();
      });
  }
}
