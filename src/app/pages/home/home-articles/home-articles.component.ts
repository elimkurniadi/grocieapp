import { Component, OnInit } from '@angular/core';
import { Article } from '@shared/models/article';
import { ArticleService } from '@shared/services/modules/article.service';

@Component({
  selector: 'app-home-articles',
  templateUrl: './home-articles.component.html',
  styleUrls: ['./home-articles.component.scss'],
})
export class HomeArticlesComponent implements OnInit {
  constructor(private articleSrv: ArticleService) {}

  articles;

  ionViewDidEnter() {}

  ngOnInit() {
    this.articleSrv.getArticle().then((res) => {
      const articles = res.response as Article[];
      this.articles = articles;
    });
  }
}
