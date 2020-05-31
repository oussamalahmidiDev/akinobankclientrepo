import { TestBed } from '@angular/core/testing';

import { ComptesService } from './comptes.service';

describe('ComptesService', () => {
  let service: ComptesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComptesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
