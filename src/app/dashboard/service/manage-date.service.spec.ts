import { TestBed } from '@angular/core/testing';

import { ManageDateService } from './manage-date.service';

describe('ManageDateService', () => {
  let service: ManageDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
