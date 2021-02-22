import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Article } from '@shared/models/article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  @Input() article: Article;
  @Input() redirectBack = '/article';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  goBack() {
    this.modalCtrl.dismiss();
  }
}
