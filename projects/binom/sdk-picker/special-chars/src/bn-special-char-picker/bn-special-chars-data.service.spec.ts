import { TestBed } from '@angular/core/testing';

import { BnSpecialCharsDataService } from './bn-special-chars-data.service';

describe('BnSpecialCharsDataService', () => {
  let service: BnSpecialCharsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BnSpecialCharsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
