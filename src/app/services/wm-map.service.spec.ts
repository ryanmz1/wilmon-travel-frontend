import { TestBed } from '@angular/core/testing';

import { WmMapService } from './wm-map.service';

describe('WmMapService', () => {
  let service: WmMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WmMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
