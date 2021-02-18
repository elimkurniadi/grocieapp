import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }
  article

  ngOnInit() {
    console.log(this.article);
  }
  
  goBack() {
    this.modalCtrl.dismiss();
  }

}
