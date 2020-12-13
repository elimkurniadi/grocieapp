import { TestBed } from '@angular/core/testing';

import { ExampleService } from './example.service';
import { JwtAuthModule } from 'src/app/jwt-auth.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { IonicStorageModule } from '@ionic/storage';

describe('ExampleService', () => {
  let service: ExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JwtAuthModule, HttpClientModule, IonicStorageModule.forRoot()],
      providers: [HTTP],
    });
    service = TestBed.inject(ExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
