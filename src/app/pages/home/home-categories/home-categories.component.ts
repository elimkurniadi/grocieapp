import { Component, OnInit } from '@angular/core';
import { Category } from '@shared/models/category';
import { ToastService } from '@shared/services';
import { CategoryService } from '@shared/services/modules/category.service';

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.scss'],
})
export class HomeCategoriesComponent implements OnInit {
  categories: Category[];
  constructor(private toastSrv: ToastService, private categorySrv: CategoryService) {}

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.categorySrv
      .getList()
      .then((res) => {
        const categories = res.response as Category[];
        this.categories = categories;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }
}
