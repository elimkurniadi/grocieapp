import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from '@shared/models';

@Component({
  selector: 'app-card-brand',
  templateUrl: './card-brand.component.html',
  styleUrls: ['./card-brand.component.scss'],
})
export class CardBrandComponent implements OnInit {
  @Input() brand: Brand;

  constructor(private router: Router) {}

  ngOnInit() {}

  goToProductByBrand(brand: Brand) {
    this.router.navigate(['/product', 'list'], { queryParams: { brand_id: brand.brand_id, brand_name: brand.name } });
  }
}
