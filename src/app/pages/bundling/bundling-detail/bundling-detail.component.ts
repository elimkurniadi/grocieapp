import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bundling, Page, Product, Response, ResponsePagination } from '@shared/models';
import { ToastService } from '@shared/services';
import { BundlingService } from '@shared/services/modules';
import { ProductService } from '@shared/services/modules/product.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bundlingSrv: BundlingService,
    private productSrv: ProductService,
    private toastSrv: ToastService
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
    this.productSrv
      .getListByBundling(this.id, this.productPage)
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
      this.productPage.page += 1;

      if (this.productPage.page >= Math.ceil(this.productCount / this.productPage.row)) {
        event.target.disabled = true;
      } else {
        this.getProduct();
      }
    }, 500);
  }
}
