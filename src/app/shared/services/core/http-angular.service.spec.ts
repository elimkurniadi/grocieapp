import { TestBed } from '@angular/core/testing';

import { HttpAngularService } from './http-angular.service';
import { HttpClientModule } from '@angular/common/http';

describe('HttpAngularService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: HttpAngularService = TestBed.inject(HttpAngularService);
    expect(service).toBeTruthy();
  });
});
