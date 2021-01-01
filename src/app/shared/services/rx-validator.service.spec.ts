import { TestBed } from '@angular/core/testing';

import { RxValidatorService } from './rx-validator.service';

describe('RxValidatorService', () => {
  let service: RxValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
