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
  brandId: string;
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
      this.setKeyword(param);
      this.setCategoryId(param);
      this.setBrand(param);
    });
  }

  ngOnInit() {
    if (this.categoryId && this.categoryId !== null) {
      this.getCategory();
      this.assignProductList('category');
    } else if (this.brandId && this.brandId !== null) {
      this.assignProductList('brand');
    } else if (this.search && this.search !== null) {
      this.assignProductList('keyword');
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

  getProductList(type: string) {
    if (type === 'keyword') {
      return this.productSrv.getListByKeyword(this.search);
    } else if (type === 'category') {
      return this.productSrv.getListByCategory(this.categoryId);
    }
    {
      return this.productSrv.getListByBrand(this.brandId);
    }
  }

  assignProductList(type: string) {
    this.getProductList(type)
      .then((res: ResponsePagination) => {
        const products = res.response.rows as Product[];
        this.products = products;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  setKeyword(param: any) {
    if (param.search !== null && param.search !== '') {
      this.search = param.search;
    } else {
      this.search = null;
    }
  }

  setCategoryId(param: any) {
    if (param.cat_id !== null && param.cat_id !== '') {
      this.categoryId = param.cat_id;
    } else {
      this.categoryId = null;
    }
  }

  setBrand(param: any) {
    if (param.brand_id !== null && param.brand_id !== '') {
      this.brandId = param.brand_id;
      this.title = param.brand_name;
    } else {
      this.brandId = null;
      this.title = null;
    }
  }
}
