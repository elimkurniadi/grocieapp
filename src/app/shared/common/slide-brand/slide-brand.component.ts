import { Component, Input, OnInit } from '@angular/core';
import { Brand } from '@shared/models';

@Component({
  selector: 'app-slide-brand',
  templateUrl: './slide-brand.component.html',
  styleUrls: ['./slide-brand.component.scss'],
})
export class SlideBrandComponent implements OnInit {
  @Input() brands: Brand[];

  slideOpts = {
    slidesPerView: 4.8,
    speed: 900,
    loop: false,
    autoplay: false,
    spaceBetween: 20,
    // coverflowEffect: {
    //   rotate: 50,
    //   stretch: 0,
    //   depth: 100,
    //   modifier: 1,
    //   slideShadows: true,
    // },
  };

  constructor() {}

  ngOnInit() {}
}
