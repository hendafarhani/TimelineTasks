import { TestBed } from '@angular/core/testing';

import { WeekDataFacadeService } from './week-data-facade.service';

describe('WeekDataService', () => {
  let service: WeekDataFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeekDataFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
