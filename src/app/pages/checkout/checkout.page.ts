import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cartList = [
    {
      product: {
        product_thumbnail: 'https://via.placeholder.com/200.png',
        product_price: 18000,
        product_unit: 'kg',
        product_title: 'Wortel Merah',
        product_description: 'Wombo ahoy',
      },
      price: null,
      quantity: 1,
    },
    {
      product: {
        product_thumbnail: 'https://via.placeholder.com/200.png',
        product_price: 20000,
        product_unit: 'kg',
        product_title: 'Wortel Merah Premium',
        product_description: 'Wombo ahoy Premium super top',
      },
      price: null,
      quantity: 2,
    },
  ];
  totalPrice = 0;
  currDate = moment(new Date()).format('YYYY-MM-DD');
  selectedDate = null;
  timeList = [
    {
      time: '10:00 - 12:00',
      selected: false,
    },
    {
      time: '10:00 - 12:00',
      selected: false,
    },
    {
      time: '10:00 - 12:00',
      selected: false,
    },
    {
      time: '10:00 - 12:00',
      selected: false,
    },
  ];

  constructor() {}

  ngOnInit() {}

  onDateSelect(value) {
    this.selectedDate = moment(value).format('YYYY-MM-DD');
  }

  onTimeSelect(idx) {
    const list = this.timeList;
    list.forEach((element, index) => {
      if (index === idx) {
        element.selected = true;
      } else {
        element.selected = false;
      }
    });
  }
}
