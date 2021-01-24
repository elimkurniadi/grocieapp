import { Component, Input, OnInit } from '@angular/core';
import { Brand } from '@shared/models';

@Component({
  selector: 'app-card-brand',
  templateUrl: './card-brand.component.html',
  styleUrls: ['./card-brand.component.scss'],
})
export class CardBrandComponent implements OnInit {
  @Input() brand: Brand;

  constructor() {}

  ngOnInit() {}
}
