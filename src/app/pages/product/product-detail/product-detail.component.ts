import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(private translateSrv: TranslateService, private toastSrv: ToastService) {}
  isFavorite = false;

  ngOnInit() {}

  ctaFavorite() {
    this.isFavorite = !this.isFavorite;
    const message = this.isFavorite
      ? this.translateSrv.get('SUCCESS_ADD_FAVORITE')
      : this.translateSrv.get('SUCCESS_REMOVE_FAVORITE');
    this.toastSrv.show(message);
  }

  addToCart() {
    const message = this.translateSrv.get('SUCCESS_ADD_TO_CART');
    this.toastSrv.show(message);
  }
}
