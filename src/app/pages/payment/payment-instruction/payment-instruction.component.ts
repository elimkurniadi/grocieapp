import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-instruction',
  templateUrl: './payment-instruction.component.html',
  styleUrls: ['./payment-instruction.component.scss'],
})
export class PaymentInstructionComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  pay() {
    console.log('paid');
    this.router.navigate(['/payment', 'proof']);
  }
}
