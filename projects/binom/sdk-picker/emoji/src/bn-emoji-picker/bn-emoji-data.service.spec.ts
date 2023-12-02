import { TestBed } from '@angular/core/testing';

import { BnEmojiDataService } from './bn-emoji-data.service';

describe('BnEmojiDataService', () => {
  let service: BnEmojiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BnEmojiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
