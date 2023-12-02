import { TestBed } from '@angular/core/testing';

import { BnIconsDataService } from './bn-icons-data.service';

describe('BnIconsDataService', () => {
  let service: BnIconsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BnIconsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
