import { Injectable } from '@angular/core';
import { LevelConfig } from '../level-config';
import { of, Observable, BehaviorSubject } from 'rxjs';

const ALL_LEVELS = [
  new LevelConfig(3000, 4),
  new LevelConfig(2500, 4),
  new LevelConfig(2000, 4),
  new LevelConfig(1500, 4),
  new LevelConfig(1000, 4, 1, "Wow, you're doing great! Time to size up the grid!", 1),
  new LevelConfig(10000, 9),
  new LevelConfig(9000, 9),
  new LevelConfig(8000, 9),
  new LevelConfig(7000, 9, 1, "Nice going! Keep it up, here comes the next one", 1),
  new LevelConfig(6000, 9),
  new LevelConfig(5000, 9),
  new LevelConfig(4000, 9),
  new LevelConfig(3000, 9),
  new LevelConfig(2000, 9),
  new LevelConfig(1000, 9, 1, "You are on FIRE! Sizing up the grid again...", 2),
  new LevelConfig(10000, 16),
  new LevelConfig(9000, 16),
  new LevelConfig(8000, 16),
  new LevelConfig(7000, 16, 1, "Unbelievable! This is stunning stuff!", 3),
  new LevelConfig(6000, 16),
  new LevelConfig(5000, 16),
  new LevelConfig(4000, 16),
  new LevelConfig(3000, 16),
  new LevelConfig(2000, 16),
  new LevelConfig(1000, 16)
];

@Injectable({
  providedIn: 'root'
})
export class LevelConfigService {
  private allLevels = ALL_LEVELS;
  // Start at level 1
  private currentLevel$ = new BehaviorSubject<LevelConfig>(ALL_LEVELS[0]);
  private currentLevelIndex = 1;
  private currentLevelIndex$ = new BehaviorSubject<number>(1);

  startAgain(): void {
    this.currentLevelIndex = 1;
    this.currentLevelIndex$.next(this.currentLevelIndex);
    this.currentLevel$.next(this.allLevels[this.currentLevelIndex]);
  }
  
  getAllLevels(): Observable<LevelConfig[]> {
    return of(this.allLevels);
  }

  getCurrentLevel(): Observable<LevelConfig> {
    return this.currentLevel$.asObservable();
  }

  getCurrentLevelIndex(): Observable<number> {
    return this.currentLevelIndex$;
  }

  isLastLevel(): boolean {
    return this.allLevels.length <= this.currentLevelIndex;
  }

  nextLevel(): void {
    // TODO: improve this error handling :D (issue https://github.com/dansilcox/memory-game/issues/9)
    if (this.isLastLevel()) {
      console.info('Congratulations! You have reached the end!!!');
      throw new Error('Entire game defeated! :) Happy error I guess??');
    }

    this.currentLevelIndex++;
    this.currentLevelIndex$.next(this.currentLevelIndex);
    this.currentLevel$.next(this.allLevels[this.currentLevelIndex]);
  }
}
