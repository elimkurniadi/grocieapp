import { TestBed } from '@angular/core/testing';

import { HttpIonicService } from './http-ionic.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

describe('HttpIonicService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, IonicStorageModule.forRoot(), RouterTestingModule, IonicModule],
      providers: [HTTP],
    })
  );

  it('should be created', () => {
    const service: HttpIonicService = TestBed.inject(HttpIonicService);
    expect(service).toBeTruthy();
  });
});
