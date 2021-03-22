import { Component, Input, OnInit } from '@angular/core';
import { BrowserService } from '@shared/services/browser.service';

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

  constructor(private browserSrv: BrowserService) {}

  ngOnInit() {}

  openBanner(link: string) {
    const prefix = 'http://';
    const prefix2 = 'https://';
    if (link.substr(0, prefix.length) !== prefix && link.substr(0, prefix2.length) !== prefix2) {
      link = prefix + link;
    }

    this.browserSrv.openBrowser({ url: link });
  }
}
