import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  keyword: string;

  constructor() {}

  ngOnInit() {}

  searchProduct(event: any) {
    const value = event.detail.value;
    this.keyword = value;
    console.log('val', value);
  }
}