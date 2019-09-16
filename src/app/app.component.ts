import { Component, OnInit } from '@angular/core';
import { TimerService } from './services/timer.service';
import { map, tap } from 'rxjs/operators';
import { LevelConfigService } from './services/level-config.service';
import { LevelConfig } from './level-config';
import { NumbersService } from './services/numbers.service';
import { Observable } from 'rxjs';
import { NumberStatus } from './number-status';
import { UserLivesService } from './services/user-lives.service';
import { MessagesService } from './services/messages.service';
import { MessageType } from './message-type';
import { ScoringService } from './services/scoring.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Memory Game';
  showRetryBtn = false;
  showStartBtn = false;
  showRestartBtn = false;

  username: string = 'CHIMP';
  
  private timeRemainingMs$: Observable<number>;
  private levelConfig: LevelConfig;

  nextLevel: number = 1;

  constructor(
    private _timer: TimerService,
    private _levels: LevelConfigService,
    private _numbers: NumbersService,
    private _lives: UserLivesService,
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
      })
    ).subscribe();

    this._levels.getCurrentLevelIndex().pipe(
      tap((currentLevel: number) => {
        this.nextLevel = currentLevel + 1;
      })
    ).subscribe();
    this.timeRemainingMs$ = this._timer.getTimeRemaining();

    this._numbers.getStatus().pipe(
      map((status: NumberStatus) => {
        console.log('NumberStatus: ' + NumberStatus[status]);
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
      })
    ).subscribe();
  }

  startGame(increaseLevel: boolean = false, randomiseNumbers = true): void {
    console.log('Starting game, ' + (increaseLevel ? 'increasing level' : 'not increasing level'));
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
          console.log('Time is up - hiding numbers!');
          this._numbers.hideAll();
        }
      })
    ).subscribe();
  }

  restart(): void {
    // TODO: improve this
    window.location.reload();
  }

  setName(name: string): void {
    this.username = name;
  }
  
  private passedLevel(): void {
    let msg = this.levelConfig.hasCustomAdvanceMessage() ?
      this.levelConfig.getCustomAdvanceMessage() :
      'Great job!';

    const bonusLives = this.levelConfig.getBonusLivesAwarded();
    if (bonusLives > 0) {
      this._lives.giveLives(bonusLives);
      const lifePlural = bonusLives === 1 ? 'life' : 'lives';
      msg += ' ' + bonusLives + ' bonus ' + lifePlural + ' awarded';
    }

    this._scores.incrementScore(this.levelConfig.getLevelAdvanceScoreIncrement());
    
    this._messages.send(msg, MessageType.SUCCESS);
    this.showStartBtn = true;
  }

  private failedLevel(): void {
    this._numbers.disableAll();
    this._lives.takeLives(1);
    const livesRemaining = this._lives.getNumLivesAsNumber();
    if (livesRemaining > 0) {
      this.showRetryBtn = true;
    } else {
      this.showRestartBtn = true;
    }
    this._messages.send(
      'Better luck next time - ' + livesRemaining + ' lives left',
      livesRemaining > 0 ? MessageType.WARNING : MessageType.FAILURE
    );
  }
}
