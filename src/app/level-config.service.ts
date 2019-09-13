import { Injectable } from '@angular/core';
import { LevelConfig } from './level-config';
import { of, Observable, BehaviorSubject } from 'rxjs';

const ALL_LEVELS = [
  new LevelConfig(10000, 9, 1),
  new LevelConfig(9000, 9, 1),
  new LevelConfig(8000, 9, 1),
  new LevelConfig(7000, 9, 1),
  new LevelConfig(6000, 9, 1),
  new LevelConfig(5000, 9, 1),
  new LevelConfig(4000, 9, 1),
  new LevelConfig(3000, 9, 1),
  new LevelConfig(10000, 16, 1),
  new LevelConfig(9000, 16, 1),
  new LevelConfig(8000, 16, 1),
  new LevelConfig(7000, 16, 1),
  new LevelConfig(6000, 16, 1),
  new LevelConfig(5000, 16, 1),
  new LevelConfig(4000, 16, 1),
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

  getAllLevels(): Observable<LevelConfig[]> {
    return of(this.allLevels);
  }

  getCurrentLevelConfig(): Observable<LevelConfig> {
    return this.currentLevel$.asObservable();
  }

  getCurrentLevel(): Observable<number> {
    return this.currentLevelIndex$;
  }

  nextLevel(): void {
    this.currentLevelIndex++;
    this.currentLevelIndex$.next(this.currentLevelIndex);
    console.log('Start of level ' + (this.currentLevelIndex + 1));
    this.setLevel();
  }

  private setLevel(): void {
    this.currentLevel$.next(this.allLevels[this.currentLevelIndex]);
  }
}
