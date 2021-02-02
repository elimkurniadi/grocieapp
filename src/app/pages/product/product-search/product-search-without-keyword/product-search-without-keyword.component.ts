import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Brand, Category } from '@shared/models';
import { CacheService, ToastService } from '@shared/services';
import { BrandService, CategoryService } from '@shared/services/modules';

@Component({
  selector: 'app-product-search-without-keyword',
  templateUrl: './product-search-without-keyword.component.html',
  styleUrls: ['./product-search-without-keyword.component.scss'],
})
export class ProductSearchWithoutKeywordComponent implements OnInit {
  @Input() recentSearches: any;
  @Output() assignKeyword = new EventEmitter();

  categories: Category[];
  brands: Brand[];

  constructor(
    private categorySrv: CategoryService,
    private brandSrv: BrandService,
    private toastSrv: ToastService,
    private cache: CacheService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategory();
    this.getFeaturedBrand();
  }

  setKeyword(keyword: string) {
    this.assignKeyword.emit(keyword);
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

  goToProductByCategory(categoryId: string) {
    this.router.navigate(['/product', 'list'], { queryParams: { cat_id: categoryId } });
  }

  getFeaturedBrand() {
    this.brandSrv
      .getFeaturedList()
      .then((res) => {
        const brands = res.response as Brand[];
        this.brands = brands;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  removeItem(index: any) {
    this.recentSearches.splice(index, 1);
    this.cache.setRecentSearch(this.recentSearches);
  }

  removeAllRecent() {
    this.cache.removeRecentSearch();
    this.recentSearches = [];
  }
}
