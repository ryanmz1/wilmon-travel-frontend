import { TestBed } from '@angular/core/testing';

import { WmTravelService } from './wm-travel.service';

describe('WmTravelService', () => {
  let service: WmTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WmTravelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
