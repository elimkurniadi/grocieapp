import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-card-address',
  templateUrl: './card-address.component.html',
  styleUrls: ['./card-address.component.scss'],
})
export class CardAddressComponent implements OnInit {
  @Input() addressList = null;
  @Input() showButton = true;
  constructor(private router: Router, private navCtrl: NavController) {}

  ngOnInit() {}

  onUseAddress(idx, event) {
    event.stopPropagation();
    this.addressList.forEach((element, index) => {
      index === idx ? (element.selected = true) : (element.selected = false);
    });
    this.navCtrl.back();
  }

  onAddressClick(id) {
    if (!this.showButton) {
      this.router.navigate([`/address/form/${id}`]);
    }
  }
}
