import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Response } from '@shared/models';
import { AuthService, CacheService, ToastService } from '@shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  faFb = faFacebookF;
  faGoogle = faGoogle;

  constructor(
    private authSrv: AuthService,
    private toastSrv: ToastService,
    private router: Router,
    private cache: CacheService
  ) {}

  ngOnInit() {}

  loginGoogle() {
    this.authSrv
      .loginGoogle()
      .then((res: Response) => {
        const token = res.response;
        if (token) {
          this.cache.clearSocialInfo();
          this.router.navigate(['/tabs', 'home']);
        } else {
          this.router.navigate(['/register']);
        }
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  loginFb() {
    this.authSrv
      .loginFb()
      .then((res: Response) => {
        const token = res.response;
        if (token) {
          this.cache.clearSocialInfo();
          this.router.navigate(['/tabs', 'home']);
        } else {
          this.router.navigate(['/register']);
        }
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }
}
