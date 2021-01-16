import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritePageRoutingModule } from './favorite-routing.module';

import { FavoritePage } from './favorite.page';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FavoritePageRoutingModule, SharedModule],
  declarations: [FavoritePage, FavoriteListComponent],
})
export class FavoritePageModule {}
