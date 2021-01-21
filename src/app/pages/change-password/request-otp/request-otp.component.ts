import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@shared/pipes/translate/translate.service';

@Component({
  selector: 'app-request-otp',
  templateUrl: './request-otp.component.html',
  styleUrls: ['./request-otp.component.scss'],
})
export class RequestOtpComponent implements OnInit {
  headerText: string;

  constructor(private route: ActivatedRoute, private translate: TranslateService, private router: Router) {
    this.route.params.subscribe((param) => {
      if (param.type !== null && param.type !== '') {
        this.setHeader(param.type);
      }
    });
  }

  ngOnInit() {}

  sendOtp() {
    this.router.navigate(['/change-password', 'verify-otp']);
  }
  setHeader(type: string) {
    switch (type) {
      case 'forgot-password':
        this.headerText = this.translate.get('FORGOT_PASSWORD');
        break;
      case 'change-password':
        this.headerText = this.translate.get('CHANGE_PASSWORD');
        break;

      default:
        break;
    }
  }
}
