import { TestBed } from '@angular/core/testing';

import { TimelineTasksFacadeService } from './timeline-tasks-facade.service';

describe('TimelineTasksFacadeServiceService', () => {
  let service: TimelineTasksFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineTasksFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
