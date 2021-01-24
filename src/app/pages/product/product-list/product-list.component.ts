import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  title: string;
  search: string;

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

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((param) => {
      if (param.search !== null && param.search !== '') {
        this.search = param.search;
      } else {
        this.title = 'Fruit';
        this.search = '';
      }
    });
  }

  ngOnInit() {}

  searchProduct() {
    this.router.navigate(['/product', 'search']);
  }
}
