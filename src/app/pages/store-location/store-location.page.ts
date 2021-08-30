import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Page, Response, ResponsePagination } from '@shared/models';
import { AuthService, GlobalService, ToastService } from '@shared/services';
import { BranchService } from '@shared/services/modules';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { latitude, longitude } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-store-location',
  templateUrl: './store-location.page.html',
  styleUrls: ['./store-location.page.scss'],
})
export class StoreLocationPage implements OnInit {
  fetching: boolean;
  branches: any[];
  branchCount: any;
  page: Page;
  longitude: any;
  latitude: any;

  constructor(
    private branchSrv: BranchService,
    private toastSrv: ToastService,
    private authSrv: AuthService,
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private gs: GlobalService
  ) {
    this.page = {
      row: 15,
      page: 1,
    };
  }

  ngOnInit() {
    this.longitude = null;
    this.latitude = null;
    this.fetching = true;

    this.geolocation.getCurrentPosition().then((res) => {
      if (res) {
        this.latitude = res.coords.latitude;
        this.longitude = res.coords.longitude;
        this.getBranch();
      } else {
        this.getBranch();
      }
    });
  }

  getBranch() {
    let filter = {};
    if (this.latitude && this.longitude) {
      filter = { latitude: this.latitude, longitude: this.longitude };
    }

    this.branchSrv
      .getList(this.page, filter)
      .then((res: ResponsePagination) => {
        const branches = res.response.rows;
        this.branchCount = res.response.count;
        if (this.branches && this.branches.length && this.branches.length < this.branchCount) {
          this.branches = this.branches.concat(branches);
        } else {
          this.branches = branches;
        }

        this.fetching = false;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
        this.fetching = false;
      });
  }

  searchBranch(event) {
    this.fetching = true;

    const keyword = event.target.value;

    this.geolocation.getCurrentPosition().then((res) => {
      if (res) {
        this.latitude = res.coords.latitude;
        this.longitude = res.coords.longitude;
        this.getBranchWithFilter(keyword);
      } else {
        this.getBranchWithFilter(keyword);
      }
    });
  }

  getBranchWithFilter(keyword: any) {
    const filter: any = { keyword };

    if (this.latitude && this.longitude) {
      filter['latitude'] = this.latitude;
      filter['longitude'] = this.longitude;
    }

    console.log('filter', filter);

    console.log('latitude', this.latitude);
    this.branchSrv
      .getListWithFilter(this.page, filter)
      .then((res: Response) => {
        const branches = res.response;
        this.branches = branches;

        this.fetching = false;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
        this.fetching = false;
      });
  }

  selectBranch(branch: any) {
    this.branchSrv
      .selectBranch(branch.branch_id)
      .then((res: Response) => {
        this.authSrv.loginByToken(res);
        this.navCtrl.navigateRoot('/tabs/home');
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  loadMoreBranch(event: any) {
    setTimeout(() => {
      event.target.complete();
      this.page.page += 1;

      if (this.page.page >= Math.ceil(this.branchCount / this.page.row)) {
        event.target.disabled = true;
      } else {
        this.fetching = true;
        this.getBranch();
      }
    }, 500);
  }
}
