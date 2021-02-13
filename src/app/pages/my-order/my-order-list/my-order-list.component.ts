import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-my-order-list',
  templateUrl: './my-order-list.component.html',
  styleUrls: ['./my-order-list.component.scss'],
})
export class MyOrderListComponent implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  segmentValue = 'ongoing';

  constructor() {}

  ngOnInit() {}

  segmentChanged(event: any) {
    const value = event.detail.value;
    let slideIdx = 0;
    if (value === 'history') {
      slideIdx = 1;
    }

    this.slides.slideTo(slideIdx);
  }

  async slideChanged() {
    const activeIndex = await this.slides.getActiveIndex();
    if (activeIndex === 0) {
      this.segmentValue = 'ongoing';
    } else {
      this.segmentValue = 'history';
    }
  }
}
