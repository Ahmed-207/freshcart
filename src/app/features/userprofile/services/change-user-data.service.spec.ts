import { TestBed } from '@angular/core/testing';

import { ChangeUserDataService } from './change-user-data.service';

describe('ChangeUserDataService', () => {
  let service: ChangeUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
