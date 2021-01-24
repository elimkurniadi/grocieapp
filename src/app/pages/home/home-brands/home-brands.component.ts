import { Component, OnInit } from '@angular/core';
import { Brand } from '@shared/models';
import { ToastService } from '@shared/services';
import { BrandService } from '@shared/services/modules';

@Component({
  selector: 'app-home-brands',
  templateUrl: './home-brands.component.html',
  styleUrls: ['./home-brands.component.scss'],
})
export class HomeBrandsComponent implements OnInit {
  brands: Brand[];
  constructor(private toastSrv: ToastService, private brandSrv: BrandService) {}

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
