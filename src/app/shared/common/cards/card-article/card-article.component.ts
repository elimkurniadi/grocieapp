import { Component, Input, OnInit } from '@angular/core';
import { Article } from '@shared/models/article';

@Component({
  selector: 'app-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss'],
})
export class CardArticleComponent implements OnInit {

  @Input() article: Article;

  constructor() { }

  ngOnInit() {}

}
