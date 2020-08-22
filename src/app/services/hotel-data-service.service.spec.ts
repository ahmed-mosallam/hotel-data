import { TestBed } from '@angular/core/testing';

import { HotelDataService } from './hotel-data.service';

describe('HotelDataServiceService', () => {
  let service: HotelDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
