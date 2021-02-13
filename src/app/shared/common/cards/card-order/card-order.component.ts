import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.scss'],
})
export class CardOrderComponent implements OnInit {
  @Input() order = {
    order_id: 'AHS - 70009876543',
    order_status: 'in_process',
    order_status_name: 'Order In Process',
    order_date: new Date(),
    order_payment_method: 'Manual Bank Transfer',
    total_payment: '70000',
  };
  constructor() {}

  ngOnInit() {}
}
