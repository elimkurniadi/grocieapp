import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@shared/models';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss'],
})
export class CardCategoryComponent implements OnInit {
  @Input() category: Category;

  constructor(private router: Router) {}

  ngOnInit() {}

  goToProductByCategory(categoryId: string) {
    this.router.navigate(['/product', 'list'], { queryParams: { cat_id: categoryId } });
  }
}
