import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticlePageRoutingModule } from './article-routing.module';

import { ArticlePage } from './article.page';
import { SharedModule } from '@shared/shared.module';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlePageRoutingModule,
    SharedModule,
  ],
  declarations: [ArticlePage, ArticleListComponent, ArticleDetailComponent]
})
export class ArticlePageModule { }
