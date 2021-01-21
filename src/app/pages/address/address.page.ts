import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  listAddress = [
    {
      title: 'Home',
      address: 'Jl. jalan ke binaria 777',
      detail: 'Belok kiri belok kanan',
      selected: true,
    },
    {
      title: 'Office',
      address: 'Jl. jalanin aja dulu',
      detail: 'Belok kiri belok kanan lalu lurus',
      selected: false,
    },
  ];

  selectMode = false;
  constructor(private activatedRoute: ActivatedRoute) {
    this.observeQueryParam();
  }

  ngOnInit() {}

  observeQueryParam() {
    this.activatedRoute.queryParams.subscribe((param) => {
      const mode = param?.mode;
      mode && mode === 'select' ? (this.selectMode = true) : (this.selectMode = false);
    });
  }
}
