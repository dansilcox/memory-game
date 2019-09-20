import { TestBed } from '@angular/core/testing';

import { HighScoresService } from './high-scores.service';

describe('HighScoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HighScoresService = TestBed.get(HighScoresService);
    expect(service).toBeTruthy();
  });
});
