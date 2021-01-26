import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Product, Response, ResponsePagination } from '@shared/models';
import { ToastService } from '@shared/services';
import { CategoryService } from '@shared/services/modules';
import { ProductService } from '@shared/services/modules/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  title: string;
  search: string;
  categoryId: string;
  category: Category;
  products: Product[];

  banners = [
    {
      source: 'https://via.placeholder.com/360x203.png?text=Promotional+Banner',
    },

    {
      source: 'https://via.placeholder.com/360x203.png?text=Promotional+Banner',
    },
    {
      source: null,
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categorySrv: CategoryService,
    private productSrv: ProductService,
    private toastSrv: ToastService
  ) {
    this.route.queryParams.subscribe((param) => {
      if (param.search !== null && param.search !== '') {
        this.search = param.search;
      } else {
        this.search = '';
      }

      if (param.cat_id !== null && param.cat_id !== '') {
        this.categoryId = param.cat_id;
      }
    });
  }

  ngOnInit() {
    if (this.categoryId) {
      this.getCategory();
      this.getProduct();
    }
  }

  searchProduct() {
    this.router.navigate(['/product', 'search']);
  }

  getCategory() {
    this.categorySrv
      .getDetail(this.categoryId)
      .then((res: Response) => {
        const category = res.response as Category;
        this.category = category;
        this.title = this.category.name;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  getProduct() {
    this.productSrv
      .getListByCategory(this.categoryId)
      .then((res: ResponsePagination) => {
        const products = res.response.rows as Product[];
        this.products = products;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }
}
