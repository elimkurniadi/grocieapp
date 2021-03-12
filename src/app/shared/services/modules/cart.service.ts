import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  async calculateSumPrice(list) {
    const prices = [];
    list.forEach((element) => {
      prices.push(element.local_subtotal_price);
    });
    const sum = prices.reduce((a, b) => a + b, 0);
    return sum;
  }

  addToCart(productId, qty = 0): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.postData('cart', { product_id: productId, quantity: qty });
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getCartList(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('cart');
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res) => {
          resolve(res?.response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getCartMaxQty(productId): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`cart/max_quantity?product_id=${productId}`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res) => {
          resolve(res?.response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  updateCartQuantity(id, qty): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.putData(`cart/quantity/${id}`, { quantity: qty });
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res) => {
          resolve(res?.response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  deleteCartItem(cartId): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.deleteData(`cart/${cartId}`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
