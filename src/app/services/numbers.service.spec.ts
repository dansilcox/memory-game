import { TestBed } from '@angular/core/testing';

import { NumbersService } from './numbers.service';

describe('NumbersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NumbersService = TestBed.get(NumbersService);
    expect(service).toBeTruthy();
  });
});
