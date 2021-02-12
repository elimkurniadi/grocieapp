import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox-detail',
  templateUrl: './inbox-detail.component.html',
  styleUrls: ['./inbox-detail.component.scss'],
})
export class InboxDetailComponent implements OnInit {
  inbox: any = {
    title: 'Save IDR 120k off!',
    date: Date.now(),
    description:
      'Lorem ipsum dolor sir amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et',
  };

  constructor() {}

  ngOnInit() {}
}
