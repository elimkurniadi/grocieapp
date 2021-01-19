import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '@shared/services/modules/cart.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Input() cartData = null;
  @Input() showSubstract = true;
  @Output() quantityChange = new EventEmitter();
  totalPrice = 0;
  constructor(private cartSrv: CartService) {}

  ngOnInit() {
    this.calculateEachProductPrice().then(() => {
      this.cartSrv.calculateSumPrice(this.cartData).then((res) => {
        this.totalPrice = res;
      });
    });
  }

  async calculateEachProductPrice() {
    const list = this.cartData;
    await list.forEach((element) => {
      const price = element.product.product_price * element.quantity;
      element.price = price;
    });
  }

  async calculateTotalPrice() {
    await this.cartSrv.calculateSumPrice(this.cartData).then((res) => {
      this.totalPrice = res;
    });
  }

  updateQuantity(isIncrement, index) {
    const listByIndex = this.cartData[index];
    listByIndex.quantity = isIncrement
      ? listByIndex.quantity + 1
      : listByIndex.quantity > 1
      ? listByIndex.quantity - 1
      : 1;
    listByIndex.price = listByIndex.product.product_price * listByIndex.quantity;
    this.calculateTotalPrice().then(() => {
      this.quantityChange.emit(this.totalPrice);
    });
  }
}
