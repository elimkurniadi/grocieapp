import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalFilterProductComponent } from '@shared/common/modals/modal-filter-product/modal-filter-product.component';
import { ModalSortProductComponent } from '@shared/common/modals/modal-sort-product/modal-sort-product.component';
import { Category, Product, Response, ResponsePagination, Sort } from '@shared/models';
import { ToastService } from '@shared/services';
import { CategoryService, ProductService } from '@shared/services/modules';

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
  sort: any;
  order: Sort;
  filter: any;
  productType: string;
  brandImage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categorySrv: CategoryService,
    private productSrv: ProductService,
    private toastSrv: ToastService,
    private modalCtrl: ModalController
  ) {
    this.route.queryParams.subscribe((param) => {
      this.setKeyword(param);
      this.setCategoryId(param);
      this.setBrand(param);
      this.setFilterParam(param);
    });
  }

  ionViewWillEnter() {
    if (this.categoryId && this.categoryId !== null) {
      this.getCategory();
      this.productType = 'category';
      this.assignProductList();
    } else if (this.brandId && this.brandId !== null) {
      this.productType = 'brand';
      this.assignProductList();
    } else if (this.search && this.search !== null) {
      this.productType = 'keyword';
      this.assignProductList();
    }
  }

  ngOnInit() {}

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
    const ordering = this.setOrdering();
    const filter = this.setFilter();

    if (type === 'keyword') {
      return this.productSrv.getListByKeyword(this.search, null, ordering, filter);
    } else if (type === 'category') {
      return this.productSrv.getListByCategory(this.categoryId, null, ordering, filter);
    }
    {
      return this.productSrv.getListByBrand(this.brandId, null, ordering, filter);
    }
  }

  setOrdering() {
    let ordering = null;

    if (this.order && this.order.orderBy) {
      ordering = this.order;
    }

    return ordering;
  }
  setFilter() {
    let filter = null;

    if (this.filter && this.filter.min_price) {
      filter = this.filter;
    }

    return filter;
  }
  assignProductList() {
    this.getProductList(this.productType)
      .then((res: ResponsePagination) => {
        const products = res.response.rows as Product[];
        this.products = products;

        // handle checking brand image
        if (res.response.image_url) {
          this.brandImage = res.response.image_url;
        }
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

  setFilterParam(param: any) {
    const filter = {};

    if (param.min_price !== null && param.min_price !== '') {
      filter['min_price'] = param.min_price;
    }

    if (param.max_price !== null && param.max_price !== '') {
      filter['max_price'] = param.max_price;
    }

    this.filter = filter;
  }

  async showFilter() {
    const modal = await this.modalCtrl.create({
      component: ModalFilterProductComponent,
      cssClass: 'modal-filter-product',
      componentProps: {
        minPrice: this.filter?.min_price,
        maxPrice: this.filter?.max_price,
      },
    });

    modal.onDidDismiss().then((res) => {
      const data = res.data;
      if (data) {
        this.filter = {
          min_price: data.minPrice,
          max_price: data.maxPrice,
        };

        this.refreshProduct();
      }
    });

    return await modal.present();
  }

  async showSort() {
    const modal = await this.modalCtrl.create({
      component: ModalSortProductComponent,
      cssClass: 'modal-sort-product',
      componentProps: {
        option: this.sort,
      },
    });

    modal.onDidDismiss().then((res) => {
      const data = res.data;
      if (data) {
        this.sort = data.value;
        this.order = {
          orderBy: data.order?.orderBy,
          orderType: data.order?.orderType,
        };

        this.refreshProduct();
      }
    });

    return await modal.present();
  }

  refreshProduct() {
    this.products = [];
    this.assignProductList();
  }
}
