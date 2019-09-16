import { TestBed } from '@angular/core/testing';

import { LevelConfigService } from './level-config.service';

describe('LevelConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LevelConfigService = TestBed.get(LevelConfigService);
    expect(service).toBeTruthy();
  });
});
