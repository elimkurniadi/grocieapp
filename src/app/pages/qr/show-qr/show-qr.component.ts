import { Component, OnInit } from '@angular/core';
import { UserService } from '@shared/services/modules';

@Component({
  selector: 'app-show-qr',
  templateUrl: './show-qr.component.html',
  styleUrls: ['./show-qr.component.scss'],
})
export class ShowQrComponent implements OnInit {

  userData;
  constructor(private userSrv:UserService) { }

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData(event = null) {
    this.userSrv
      .getProfile()
      .then((res) => {
        console.log('res', res);
        this.userData = res;
        if (event) {
          event.target.complete();
        }
      })
      .catch(() => {
        if (event) {
          event.target.complete();
        }
      });
  }

}
