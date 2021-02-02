import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '@shared/models';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { ToastService } from '@shared/services';
import { BrandService } from '@shared/services/modules';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
})
export class BrandListComponent implements OnInit {
  brands: Brand[];
  title: string;
  constructor(
    private route: ActivatedRoute,
    private brandSrv: BrandService,
    private toastSrv: ToastService,
    private translate: TranslateService
  ) {
    this.title = 'Brand';
    this.route.params.subscribe((param) => {
      if (param.type && param.type === 'featured') {
        this.title = this.translate.get('FEATURED_BRAND');
      }
    });
  }

  ngOnInit() {
    this.getFeaturedBrand();
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
}
