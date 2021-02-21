import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { AlertService } from '@shared/services/alert.service';
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
  @Output() afterDeleteItem = new EventEmitter();
  totalPrice = 0;

  constructor(private cartSrv: CartService, private alertSrv: AlertService, private translateSrv: TranslateService) {}

  ngOnInit() {
    if (this.cartData) {
      this.calculateEachProductPrice().then(() => {
        this.cartSrv.calculateSumPrice(this.cartData).then((res) => {
          this.totalPrice = res;
        });
      });
    }
  }

  ionViewDidEnter() {
    console.log('TESTING', this.cartData);
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

  updateQuantity(index) {
    const listByIndex = this.cartData[index];
    const currentQty = listByIndex?.quantity;
    this.cartSrv.updateCartQuantity(listByIndex?.cart_id, currentQty).then((res) => {
      listByIndex.quantity = res;
      listByIndex.local_subtotal_price = +listByIndex?.product?.primary_price * +res;
      this.calculateTotalPrice().then(() => {
        this.quantityChange.emit(this.totalPrice);
      });
    });
  }

  updateLocalQuantity(index, isIncrement) {
    const listByIndex = this.cartData[index];
    const currentQty = isIncrement ? listByIndex?.quantity + 1 : listByIndex?.quantity - 1;
    currentQty === 0 ? this.showAlertRemoveItem(this.cartData[index]?.cart_id) : (listByIndex.quantity = currentQty);
  }

  showAlertRemoveItem(cartId) {
    this.alertSrv.presentAlert({
      message: `${this.translateSrv.get('REMOVE_CART_ITEM_CONFIRM')}`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.removeItemFromCart(cartId);
          },
        },
        {
          text: `${this.translateSrv.get('CANCEL')}`,
          role: 'cancel',
        },
      ],
    });
  }

  removeItemFromCart(cartId) {
    this.cartSrv.deleteCartItem(cartId).then(() => {
      this.afterDeleteItem.emit();
    });
  }
}
