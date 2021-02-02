import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFilterProductComponent } from '@shared/common/modals/modal-filter-product/modal-filter-product.component';
import { Brand, Page, Product, Response, ResponsePagination } from '@shared/models';
import { CacheService, ToastService } from '@shared/services';
import { BrandService } from '@shared/services/modules';
import { ProductService } from '@shared/services/modules/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  keyword: string;
  recentSearches: any[] = [];
  page: Page;
  products: Product[];
  brands: Brand[];

  constructor(
    private productSrv: ProductService,
    private brandSrv: BrandService,
    private toastSrv: ToastService,
    private cache: CacheService,
    private modalCtrl: ModalController
  ) {
    this.page = {
      row: 10,
      page: 1,
    };
  }

  ngOnInit() {
    this.saveRecentSearch();
  }

  fetchData() {
    if (this.keyword && this.keyword !== '' && this.keyword !== null) {
      this.getProduct();
      this.getBrand();
    }
  }

  searchProduct(event: any) {
    const value = event.detail.value;
    this.keyword = value;

    this.fetchData();
  }

  assignKeyword(keyword: string) {
    this.keyword = keyword;

    this.fetchData();
  }

  getProduct() {
    this.productSrv
      .getListByKeyword(this.keyword, this.page)
      .then((res: ResponsePagination) => {
        this.saveRecentSearch();
        const products = res.response.rows as Product[];
        this.products = products;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  getBrand() {
    this.brandSrv
      .getList(this.page)
      .then((res: Response) => {
        this.saveRecentSearch();
        const brands = res.response as Brand[];
        this.brands = brands;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  appendRecentSearch() {
    if (this.recentSearches.includes(this.keyword)) {
      const searchIdx = this.recentSearches.findIndex((search) => search === this.keyword);
      this.recentSearches.splice(searchIdx, 1);
    }

    this.recentSearches.push(this.keyword);
  }

  saveRecentSearch() {
    this.cache.getRecentSearch().then((data) => {
      if (data) {
        this.recentSearches = data.reverse();
      }

      if (this.keyword && this.keyword !== '' && this.keyword !== null) {
        this.appendRecentSearch();
      }

      this.cache.setRecentSearch(this.recentSearches);
    });
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
}
