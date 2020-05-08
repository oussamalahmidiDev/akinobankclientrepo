import { TestBed } from '@angular/core/testing';

import { VirementsService } from './virements.service';

describe('VirementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VirementsService = TestBed.get(VirementsService);
    expect(service).toBeTruthy();
  });
});
