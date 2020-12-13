import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtAuthModule } from 'src/app/jwt-auth.module';
import { HTTP } from '@ionic-native/http/ngx';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot(), HttpClientModule, RouterTestingModule, JwtAuthModule],
      providers: [HTTP],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
