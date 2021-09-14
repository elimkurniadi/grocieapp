import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ModalFilterProductComponent } from '@shared/common/modals/modal-filter-product/modal-filter-product.component';
import { ModalSortProductComponent } from '@shared/common/modals/modal-sort-product/modal-sort-product.component';
import { Category, Product, Response, ResponsePagination, Sort } from '@shared/models';
import { GlobalService, ToastService } from '@shared/services';
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
  categoriesChunk: any[];
  fetching = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categorySrv: CategoryService,
    private productSrv: ProductService,
    private toastSrv: ToastService,
    private modalCtrl: ModalController,
    private gs: GlobalService,
    private navCtrl: NavController,
    private zone: NgZone
  ) {
    this.route.queryParams.subscribe((param) => {
      this.zone.run(() => {
        this.setKeyword(param);
        this.setCategoryId(param);
        this.setBrand(param);
        this.setFilterParam(param);
      });
    });
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
    this.fetching = true;
    this.getProductList(this.productType)
      .then((res: ResponsePagination) => {
        const products = res.response.rows as Product[];
        this.products = products;

        // handle checking brand image
        if (res.response.image_url) {
          this.brandImage = res.response.image_url;
        }
        this.fetching = false;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
        this.fetching = false;
      });
  }

  getSubcategory(id: any) {
    this.categorySrv
      .getSubcategory(id)
      .then((res) => {
        const categories = res.response as Category[];
        this.categoriesChunk = this.gs.chunk(categories, 3);
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  setKeyword(param: any) {
    if (param.search !== null && param.search !== '' && typeof param.search !== 'undefined') {
      this.search = param.search;

      this.productType = 'keyword';
      this.assignProductList();
    } else {
      this.search = null;
    }
  }

  setCategoryId(param: any) {
    if (param.cat_id !== null && param.cat_id !== '' && typeof param.cat_id !== 'undefined') {
      this.categoryId = param.cat_id;
      this.getSubcategory(this.categoryId);
      this.getCategory();
      this.productType = 'category';
      this.assignProductList();
    } else {
      this.categoryId = null;
    }
  }

  setBrand(param: any) {
    if (param.brand_id !== null && param.brand_id !== '' && typeof param.brand_id !== 'undefined') {
      this.brandId = param.brand_id;
      this.title = param.brand_name;

      this.productType = 'brand';
      this.assignProductList();
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

  goBack() {
    this.zone.run(() => {
      this.navCtrl.back();
    });
  }
}
