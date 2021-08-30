import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Category } from '@shared/models';

@Component({
  selector: 'app-card-subcategory',
  templateUrl: './card-subcategory.component.html',
  styleUrls: ['./card-subcategory.component.scss'],
})
export class CardSubcategoryComponent implements OnInit {
  @Input() category: Category;

  constructor(private router: Router, private navCtrl: NavController) {}

  ngOnInit() {}

  goToProductByCategory(categoryId: string) {
    this.navCtrl.navigateForward(`/product/list?cat_id=${categoryId}`);
  }
}
