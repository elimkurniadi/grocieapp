import { TestBed } from '@angular/core/testing';

import { BundlingService } from './bundling.service';

describe('BundlingService', () => {
  let service: BundlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BundlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
