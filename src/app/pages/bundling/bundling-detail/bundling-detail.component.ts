import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalFilterProductComponent } from '@shared/common/modals/modal-filter-product/modal-filter-product.component';
import { ModalSortProductComponent } from '@shared/common/modals/modal-sort-product/modal-sort-product.component';
import { Bundling, Page, Product, Response, ResponsePagination, Sort } from '@shared/models';
import { ToastService } from '@shared/services';
import { BundlingService, ProductService } from '@shared/services/modules';

@Component({
  selector: 'app-bundling-detail',
  templateUrl: './bundling-detail.component.html',
  styleUrls: ['./bundling-detail.component.scss'],
})
export class BundlingDetailComponent implements OnInit {
  bundling: Bundling;
  id: string;
  products: Product[];
  productPage: Page;
  productCount: number;
  sort: any;
  order: Sort;
  filter: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bundlingSrv: BundlingService,
    private productSrv: ProductService,
    private toastSrv: ToastService,
    private modalCtrl: ModalController
  ) {
    this.route.params.subscribe((param) => {
      if (param.id !== null) {
        this.id = param.id;
      }
    });

    this.productPage = {
      row: 24,
      page: 1,
    };
  }

  ngOnInit() {
    if (this.id) {
      this.getBundlingDetail();
      this.getProduct();
    }
  }

  searchProduct() {
    this.router.navigate(['/product', 'search']);
  }

  getBundlingDetail() {
    this.bundlingSrv
      .getDetail(this.id)
      .then((res: Response) => {
        const bundling = res.response as Bundling;
        this.bundling = bundling;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  getProduct() {
    let ordering = null;
    let filter = null;

    if (this.order && this.order.orderBy) {
      ordering = this.order;
    }

    if (this.filter && this.filter.min_price) {
      filter = this.filter;
    }

    this.productSrv
      .getListByBundling(this.id, this.productPage, ordering, filter)
      .then((res: ResponsePagination) => {
        const products = res.response.rows as Product[];
        this.productCount = res.response.count;
        if (this.products && this.products.length) {
          this.products.concat(products);
        } else {
          this.products = products;
        }
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  loadMoreProduct(event: any) {
    setTimeout(() => {
      event.target.complete();

      if (this.productPage.page >= Math.ceil(this.productCount / this.productPage.row)) {
        event.target.disabled = true;
      } else {
        this.productPage.page += 1;
        this.getProduct();
      }
    }, 600);
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
    this.productPage.page = 1;
    this.products = [];
    this.getProduct();
  }
}
