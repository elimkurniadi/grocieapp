import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
})
export class PaymentListComponent implements OnInit {
  paymentMethod: string;

  constructor(private router: Router) {}

  ngOnInit() {}

  next() {
    if (this.paymentMethod === 'cod') {
      this.router.navigate(['/payment', 'cod']);
    }
  }
}
