import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-voucher-point',
  templateUrl: './card-voucher-point.component.html',
  styleUrls: ['./card-voucher-point.component.scss'],
})
export class CardVoucherPointComponent implements OnInit {
  @Input() voucher: any;

  constructor() {}

  ngOnInit() {}
}
