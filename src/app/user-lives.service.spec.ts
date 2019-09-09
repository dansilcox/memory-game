import { TestBed } from '@angular/core/testing';

import { UserLivesService } from './user-lives.service';

describe('UserLivesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserLivesService = TestBed.get(UserLivesService);
    expect(service).toBeTruthy();
  });
});
