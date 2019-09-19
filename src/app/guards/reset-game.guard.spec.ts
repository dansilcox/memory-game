import { TestBed, async, inject } from '@angular/core/testing';

import { ResetGameGuard } from './reset-game.guard';

describe('ResetGameGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetGameGuard]
    });
  });

  it('should ...', inject([ResetGameGuard], (guard: ResetGameGuard) => {
    expect(guard).toBeTruthy();
  }));
});
