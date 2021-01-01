import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-brand',
  templateUrl: './slide-brand.component.html',
  styleUrls: ['./slide-brand.component.scss'],
})
export class SlideBrandComponent implements OnInit {
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
