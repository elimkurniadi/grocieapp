import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Article } from '@shared/models/article';
import { ArticleDetailComponent } from 'src/app/pages/article/article-detail/article-detail.component';

@Component({
  selector: 'app-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss'],
})
export class CardArticleComponent implements OnInit {
  @Input() article: Article;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async goToNewsDetail(news) {
    const modal = await this.modalCtrl.create({
      component: ArticleDetailComponent,
      componentProps: {
        article: news,
        redirectBack: '/tabs/home',
      },
    });

    return await modal.present();
  }
}
