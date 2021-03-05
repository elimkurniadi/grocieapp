import { Component, OnInit } from '@angular/core';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '@shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  faFb = faFacebookF;
  faGoogle = faGoogle;

  constructor(private authSrv: AuthService) {}

  ngOnInit() {}

  loginGoogle() {
    this.authSrv.loginGoogle();
  }

  loginFb() {
    this.authSrv.loginFb();
  }
}
