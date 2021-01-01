import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-groceries',
  templateUrl: './home-groceries.component.html',
  styleUrls: ['./home-groceries.component.scss'],
})
export class HomeGroceriesComponent implements OnInit {
  banners = [
    {
      source: 'https://via.placeholder.com/360x203.png?text=Promotional+Banner',
    },

    {
      source: 'https://via.placeholder.com/360x203.png?text=Promotional+Banner',
    },
    {
      source: null,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
