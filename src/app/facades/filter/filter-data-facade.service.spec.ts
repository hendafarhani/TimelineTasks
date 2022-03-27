import { TestBed } from '@angular/core/testing';

import { FilterDataFacadeService } from './filter-data-facade.service';

describe('FilterDataFacadeService', () => {
  let service: FilterDataFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterDataFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
