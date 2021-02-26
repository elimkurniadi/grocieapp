import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Brand, Product } from '@shared/models';

@Component({
  selector: 'app-product-search-with-keyword',
  templateUrl: './product-search-with-keyword.component.html',
  styleUrls: ['./product-search-with-keyword.component.scss'],
})
export class ProductSearchWithKeywordComponent implements OnInit {
  @Input() keyword: string;
  @Input() products: Product[];
  @Input() brands: Brand[];
  @Output() redirectToList = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  goToProductList() {
    this.redirectToList.emit();
  }
}
