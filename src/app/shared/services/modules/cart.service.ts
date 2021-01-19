import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  async calculateSumPrice(list) {
    const prices = [];
    list.forEach((element) => {
      prices.push(element.price);
    });
    const sum = prices.reduce((a, b) => a + b, 0);
    return sum;
  }
}
