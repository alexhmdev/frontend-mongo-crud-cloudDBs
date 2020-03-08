import { TestBed } from '@angular/core/testing';

import { HousesServiceService } from './houses-service.service';

describe('HousesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HousesServiceService = TestBed.get(HousesServiceService);
    expect(service).toBeTruthy();
  });
});
