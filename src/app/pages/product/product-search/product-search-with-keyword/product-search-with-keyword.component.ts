import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  ngOnInit() {}

  goToProductList() {
    this.router.navigate(['/product', 'list'], { queryParams: { search: this.keyword } });
  }
}
