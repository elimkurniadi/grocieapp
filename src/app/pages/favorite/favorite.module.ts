import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritePageRoutingModule } from './favorite-routing.module';

import { FavoritePage } from './favorite.page';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { SharedModule } from '@shared/shared.module';
import { FavoriteDetailComponent } from './favorite-detail/favorite-detail.component';
import { FavoriteNewComponent } from './favorite-new/favorite-new.component';
import { FavoriteEmptyComponent } from './favorite-empty/favorite-empty.component';
import { FavoriteSkeletonComponent } from './favorite-skeleton/favorite-skeleton.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FavoritePageRoutingModule, SharedModule, ReactiveFormsModule],
  declarations: [
    FavoritePage,
    FavoriteListComponent,
    FavoriteDetailComponent,
    FavoriteNewComponent,
    FavoriteEmptyComponent,
    FavoriteSkeletonComponent,
  ],
  exports: [FavoriteNewComponent],
})
export class FavoritePageModule {}
