import { Component, OnInit } from '@angular/core';
import { ArticleService } from '@shared/services/modules/article.service';
import { Article } from '@shared/models/article';
import { ModalController } from '@ionic/angular';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  constructor(private articleSrv: ArticleService, private modalCtrl: ModalController) {}

  articles;

  ngOnInit() {
    this.articleSrv.getArticle().then((res) => {
      const articles = res.response as Article[];
      this.articles = articles;
    });
  }

  async goToNewsDetail(news) {
    const modal = await this.modalCtrl.create({
      component: ArticleDetailComponent,
      componentProps: {
        article: news,
      },
    });

    return await modal.present();
  }
}
