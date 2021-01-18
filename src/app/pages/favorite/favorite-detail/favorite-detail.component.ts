import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-detail',
  templateUrl: './favorite-detail.component.html',
  styleUrls: ['./favorite-detail.component.scss'],
})
export class FavoriteDetailComponent implements OnInit {
  favorite: any = {
    title: 'My Shopping List',
  };

  constructor() {}

  ngOnInit() {}
}
