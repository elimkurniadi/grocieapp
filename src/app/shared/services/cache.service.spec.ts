import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';
import { IonicStorageModule } from '@ionic/storage';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
    });
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
