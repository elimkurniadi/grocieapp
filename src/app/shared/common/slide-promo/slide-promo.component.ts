import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-promo',
  templateUrl: './slide-promo.component.html',
  styleUrls: ['./slide-promo.component.scss'],
})
export class SlidePromoComponent implements OnInit {
  @Input() banners: any;
  slideOpts = {
    slidesPerView: 1,
    speed: 900,
    loop: false,
    autoplay: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };

  constructor() {}

  ngOnInit() {}
}
