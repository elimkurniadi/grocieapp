import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalFilterProductComponent } from '@shared/common/modals/modal-filter-product/modal-filter-product.component';
import { ModalSortProductComponent } from '@shared/common/modals/modal-sort-product/modal-sort-product.component';
import { Category, Product, Response, ResponsePagination } from '@shared/models';
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
    });
  }
  
  ionViewWillEnter(){
    if (this.categoryId && this.categoryId !== null) {
      this.getCategory();
      this.assignProductList('category');
    } else if (this.brandId && this.brandId !== null) {
      this.assignProductList('brand');
    } else if (this.search && this.search !== null) {
      this.assignProductList('keyword');
    }
  }

  ngOnInit() {

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

  async showFilter() {
    const modal = await this.modalCtrl.create({
      component: ModalFilterProductComponent,
      cssClass: 'modal-filter-product',
    });

    modal.onDidDismiss().then(() => {
      // Refresh data
    });

    return await modal.present();
  }

  async showSort() {
    const modal = await this.modalCtrl.create({
      component: ModalSortProductComponent,
      cssClass: 'modal-sort-product',
    });

    modal.onDidDismiss().then(() => {
      // Refresh data
    });

    return await modal.present();
  }
}
