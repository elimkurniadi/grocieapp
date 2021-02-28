import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { AlertService } from '@shared/services/alert.service';
import { CartService } from '@shared/services/modules';

@Component({
  selector: 'app-item-list-inactive',
  templateUrl: './item-list-inactive.component.html',
  styleUrls: ['./item-list-inactive.component.scss'],
})
export class ItemListInactiveComponent implements OnInit {
  @Input() cartData: any[] = null;
  @Output() afterCta = new EventEmitter();
  showSubstract = false;
  constructor(private cartSrv: CartService, private alertSrv: AlertService, private translateSrv: TranslateService) {}

  ngOnInit() {}

  updateQuantity(index) {
    const listByIndex = this.cartData[index];
    const currentQty = listByIndex?.quantity;
    if (currentQty <= listByIndex?.product?.stock) {
      this.cartSrv.updateCartQuantity(listByIndex?.cart_id, currentQty).then((res) => {
        listByIndex.quantity = res;
        listByIndex.local_subtotal_price = +listByIndex?.product?.primary_price * +res;

        this.afterCta.emit();
      });
    }
  }

  updateLocalQuantity(index, isIncrement) {
    const listByIndex = this.cartData[index];
    const canUpdate = this.compareQuantityWithStock(+listByIndex?.quantity, +listByIndex?.product?.stock);
    if ((isIncrement && canUpdate) || !isIncrement) {
      const currentQty = isIncrement ? listByIndex?.quantity + 1 : listByIndex?.quantity - 1;
      currentQty === 0 ? this.showAlertRemoveItem(this.cartData[index]?.cart_id) : (listByIndex.quantity = currentQty);
    }
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
      this.afterCta.emit();
    });
  }

  compareQuantityWithStock(qty, stock) {
    return qty < stock ? true : false;
  }
}
