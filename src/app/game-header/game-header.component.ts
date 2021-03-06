import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LevelConfigService } from '../services/level-config.service';
import { UserService } from '../services/user.service';
import { TimerService } from '../services/timer.service';
import { Message } from '../message';
import { ScoringService } from '../services/scoring.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss']
})
export class GameHeaderComponent implements OnInit {
  username$: Observable<string>;
  currentLevel$: Observable<number>;
  currentScore$: Observable<number>;
  livesRemaining$: Observable<number>;
  timeRemainingMs$: Observable<number>;
  isHighScore = false;
  isNewRecord = false;

  message$: Observable<Message>;
  
  constructor(
    private _levels: LevelConfigService,
    private _user: UserService,
    private _timer: TimerService,
    private _scores: ScoringService
  ) { }

  ngOnInit() {
    this.username$ = this._user.getName();
    this.currentLevel$ = this._levels.getCurrentLevelIndex();
    this.livesRemaining$ = this._user.getNumLives();
    this.timeRemainingMs$ = this._timer.getTimeRemaining();
    this.currentScore$ = this._scores.getCurrentScore().pipe(
      tap((score: number) => {
        this.isHighScore = this._scores.isHighScore(score);
        this.isNewRecord = this._scores.isNewRecord(score);
        return score;
      })
    );
  }
}
