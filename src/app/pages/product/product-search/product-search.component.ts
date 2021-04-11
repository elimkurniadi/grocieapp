import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { ModalFilterProductComponent } from '@shared/common/modals/modal-filter-product/modal-filter-product.component';
import { Brand, Page, Product, ResponsePagination } from '@shared/models';
import { CacheService, ToastService } from '@shared/services';
import { BrandService, ProductService } from '@shared/services/modules';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  @ViewChild('searchBar') searchBar: IonSearchbar;
  keyword: string;
  recentSearches: any[] = [];
  page: Page;
  popularProducts: Product[];
  products: Product[];
  brands: Brand[];
  filter: any;

  constructor(
    private productSrv: ProductService,
    private brandSrv: BrandService,
    private toastSrv: ToastService,
    private cache: CacheService,
    private modalCtrl: ModalController,
    private router: Router
  ) {
    this.page = {
      row: 10,
      page: 1,
    };
  }

  ngOnInit() {
    this.saveRecentSearch();
    this.getPopularProduct();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 150);
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
    let filter = null;

    if (this.filter && this.filter.min_price) {
      filter = this.filter;
    }

    this.productSrv
      .getListByKeyword(this.keyword, this.page, null, filter)
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
      .getRelated(this.keyword, this.page)
      .then((res: ResponsePagination) => {
        this.saveRecentSearch();
        const brands = res.response.rows as Brand[];
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

  refreshProduct() {
    this.getPopularProduct();
    this.fetchData();
  }

  getPopularProduct() {
    let filter = null;

    if (this.filter && this.filter.min_price) {
      filter = this.filter;
    }

    this.productSrv
      .getPopular(this.page, null, filter)
      .then((res: ResponsePagination) => {
        const products = res.response.rows as Product[];
        this.popularProducts = products;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  goToProductList() {
    const queryParams = {
      search: this.keyword,
      min_price: this.filter?.min_price,
      max_price: this.filter?.max_price,
    };

    this.router.navigate(['/product', 'list'], { queryParams });
  }

  scanQR() {
    // Scan barcode and QR function should be inserted here.
    this.router.navigate(['/qr', 'scan']);
  }
}
