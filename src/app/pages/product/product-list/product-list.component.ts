import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  title: string;

  banners = [
    {
      source: 'https://via.placeholder.com/360x203.png?text=Promotional+Banner',
    },

    {
      source: 'https://via.placeholder.com/360x203.png?text=Promotional+Banner',
    },
    {
      source: null,
    },
  ];

  constructor() {
    this.title = 'Fruit';
  }

  ngOnInit() {}
}
