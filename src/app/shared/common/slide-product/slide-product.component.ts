import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-product',
  templateUrl: './slide-product.component.html',
  styleUrls: ['./slide-product.component.scss'],
})
export class SlideProductComponent implements OnInit {
  slideOpts = {
    slidesPerView: 3.5,
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
