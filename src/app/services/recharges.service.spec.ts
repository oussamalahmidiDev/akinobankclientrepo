import { TestBed } from '@angular/core/testing';

import { RechargesService } from './recharges.service';

describe('RechargesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RechargesService = TestBed.get(RechargesService);
    expect(service).toBeTruthy();
  });
});
