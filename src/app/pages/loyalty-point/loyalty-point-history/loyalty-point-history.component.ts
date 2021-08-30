import { Component, OnInit } from '@angular/core';
import { LoyaltyPoint, Page } from '@shared/models';
import { ToastService } from '@shared/services';
import { UserService } from '@shared/services/modules';

@Component({
  selector: 'app-loyalty-point-history',
  templateUrl: './loyalty-point-history.component.html',
  styleUrls: ['./loyalty-point-history.component.scss'],
})
export class LoyaltyPointHistoryComponent implements OnInit {
  loyaltyPoints: LoyaltyPoint[];
  page: Page;
  loyaltyCount: any;
  fetching = false;

  constructor(private userSrv: UserService, private toastSrv: ToastService) {
    this.page = {
      row: 10,
      page: 1,
    };
  }

  ngOnInit() {
    this.getHistory();
  }

  getHistory() {
    this.fetching = true;

    this.userSrv
      .getLoyaltyHistory()
      .then((res) => {
        this.loyaltyPoints = res;
        this.fetching = false;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
        this.fetching = false;
      });
  }

  loadMorePoint(event: any) {
    setTimeout(() => {
      event.target.complete();
      // this.page.page += 1;

      // if (this.page.page >= Math.ceil(this.loyaltyCount / this.page.row)) {
      //   event.target.disabled = true;
      // } else {
      //   this.getHistory();
      // }
    }, 500);
  }
}
