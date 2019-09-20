import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TimerService } from '../services/timer.service';
import { map, tap, takeUntil } from 'rxjs/operators';
import { LevelConfigService } from '../services/level-config.service';
import { LevelConfig } from '../level-config';
import { NumbersService } from '../services/numbers.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { NumberStatus } from '../number-status';
import { UserService } from '../services/user.service';
import { MessagesService } from '../services/messages.service';
import { MessageType } from '../message-type';
import { ScoringService } from '../services/scoring.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.scss']
})
export class MainGameComponent implements OnInit, OnDestroy {
  showRetryBtn = false;
  showStartBtn = false;
  showRestartBtn = false;
  nextLevel: number = 1;
  started = false;
  
  private timeRemainingMs$: Observable<number>;
  private levelConfig: LevelConfig;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private _timer: TimerService,
    private _levels: LevelConfigService,
    private _numbers: NumbersService,
    private _user: UserService,
    private _messages: MessagesService,
    private _scores: ScoringService
  ) {
    this.levelConfig = new LevelConfig(0,1);
  }

  ngOnInit() {
    this._levels.getCurrentLevel().pipe(
      map((level: LevelConfig) => {
        this.levelConfig = level;
        this._numbers.reset();
        this._numbers.randomise(this.levelConfig.getGridMinNumber(), this.levelConfig.getGridMaxNumber());
        this.showRetryBtn = false;
        this.showStartBtn = false;
        this.showRestartBtn = false;
      }),
      takeUntil(this.unsubscribe)
    ).subscribe();

    this._levels.getCurrentLevelIndex().pipe(
      tap((currentLevel: number) => {
        this.nextLevel = currentLevel + 1;
      }),
      takeUntil(this.unsubscribe)
    ).subscribe();
    this.timeRemainingMs$ = this._timer.getTimeRemaining();

    this._numbers.getStatus().pipe(
      map((status: NumberStatus) => {
        switch (status) {
          case NumberStatus.FAILED_LEVEL:
            this.failedLevel();
            break;
          case NumberStatus.PASSED_LEVEL:
            this.passedLevel();
            break;
          case NumberStatus.NOT_STARTED:
          case NumberStatus.SEQUENCE_OK_SO_FAR:
          case NumberStatus.NUMBERS_VISIBLE:
            // do nothing, continue
            break;
        }
        return status;
      }),
      takeUntil(this.unsubscribe)
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  startGame(increaseLevel: boolean = false, randomiseNumbers = true): void {
    this._messages.clear();
    this.showRetryBtn = false;
    this.showStartBtn = false;
    this.showRestartBtn = false;
  
    this._numbers.reset(randomiseNumbers);
    if (randomiseNumbers || increaseLevel) {
      this._numbers.randomise(this.levelConfig.getGridMinNumber(), this.levelConfig.getGridMaxNumber());
    }

    if (increaseLevel) {
      this._levels.nextLevel();
    }
    this._numbers.showAll();

    this._timer.start(this.levelConfig.getAllowedTimeMs());
    this.timeRemainingMs$.pipe(
      map((remainingMs: number) => {
        if (remainingMs < 1) {
          this._numbers.hideAll();
        }
      }),
      takeUntil(this.unsubscribe)
    ).subscribe();
  }

  restart(): void {
    this._levels.startAgain();
    this._user.reset();
    this._numbers.reset();
    this._scores.resetCurrent();
    this._timer.clear();
  }

  setName(name: string): void {
    this._user.setName(name);
  }
  
  private passedLevel(): void {
    console.log("Passed level...");
    let msg = this.levelConfig.hasCustomAdvanceMessage() ?
      this.levelConfig.getCustomAdvanceMessage() :
      'Great job!';

    const bonusLives = this.levelConfig.getBonusLivesAwarded();
    if (bonusLives > 0) {
      this._user.giveLives(bonusLives);
      const lifePlural = bonusLives === 1 ? 'life' : 'lives';
      msg += ' ' + bonusLives + ' bonus ' + lifePlural + ' awarded';
    }

    console.log('Incrementing score...');
    this._scores.incrementScore(this.levelConfig.getLevelAdvanceScoreIncrement());
    this._messages.send(msg, MessageType.SUCCESS);

    if (this._levels.isLastLevel()) {
      this._scores.saveCurrentScore(this._user.getNameAsString());
    } else {
      this.showStartBtn = true;
    }
  }

  private failedLevel(): void {
    this._numbers.disableAll();
    this._user.takeLives(1);
    const livesRemaining = this._user.getNumLivesAsNumber();
    if (livesRemaining > 0) {
      this.showRetryBtn = true;
    } else {
      this._scores.saveCurrentScore(this._user.getNameAsString());
      this.showRestartBtn = true;
    }
    this._messages.send(
      'Better luck next time - ' + livesRemaining + ' lives left',
      livesRemaining > 0 ? MessageType.WARNING : MessageType.FAILURE
    );
  }
}
