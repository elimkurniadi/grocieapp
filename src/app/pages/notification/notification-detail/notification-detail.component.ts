import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss'],
})
export class NotificationDetailComponent implements OnInit {
  notification: any = {
    title: 'Save IDR 120k off!',
    date: Date.now(),
    description:
      'Lorem ipsum dolor sir amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et',
  };

  constructor() {}

  ngOnInit() {}
}
