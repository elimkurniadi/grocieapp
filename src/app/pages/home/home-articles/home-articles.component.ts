import { Component, Input, OnInit } from '@angular/core';
import { Article } from '@shared/models/article';
@Component({
  selector: 'app-home-articles',
  templateUrl: './home-articles.component.html',
  styleUrls: ['./home-articles.component.scss'],
})
export class HomeArticlesComponent implements OnInit {
  constructor() {}

  @Input() articles: Article[];

  ionViewDidEnter() {}

  ngOnInit() {}
}
