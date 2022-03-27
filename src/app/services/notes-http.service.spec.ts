import { TestBed } from '@angular/core/testing';

import { NotesHttpService } from './notes-http.service';

describe('NotesHttpService', () => {
  let service: NotesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
