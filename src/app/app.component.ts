import { Component, OnInit } from '@angular/core';
import { TimerService } from './timer.service';
import { map, tap } from 'rxjs/operators';
import { LevelConfigService } from './level-config.service';
import { LevelConfig } from './level-config';
import { NumbersService } from './numbers.service';
import { Observable } from 'rxjs';
import { NumberStatus } from './number-status';
import { UserLivesService } from './user-lives.service';
import { MessagesService } from './messages.service';
import { MessageType } from './message-type';

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
  
  private timeRemainingMs$: Observable<number>;
  private levelConfig: LevelConfig;

  nextLevel: number = 1;

  constructor(
    private _timer: TimerService,
    private _levels: LevelConfigService,
    private _numbers: NumbersService,
    private _lives: UserLivesService,
    private _messages: MessagesService
  ) {
    this.levelConfig = new LevelConfig(0);
  }

  ngOnInit() {
    this._levels.getCurrentLevelConfig().pipe(
      map((level: LevelConfig) => {
        this.levelConfig = level;
        this._numbers.reset();
        this.showRetryBtn = false;
        this.showStartBtn = false;
        this.showRestartBtn = false;
        this._numbers.showAll();
        this._numbers.enableAll();
        this._numbers.randomise(this.levelConfig.getGridMinNumber(), this.levelConfig.getGridMaxNumber());
      })
    ).subscribe();

    this._levels.getCurrentLevel().pipe(
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

  startGame(increaseLevel: boolean = false): void {
    this._messages.clear();
    this.showRetryBtn = false;
    this.showStartBtn = false;
    this.showRestartBtn = false;
    this._numbers.showAll();
    this._numbers.enableAll();
    if (increaseLevel) {
      this._numbers.reset();
      this._levels.nextLevel();
    }

    
    this._timer.start(this.levelConfig.getAllowedTimeMs());
    this.timeRemainingMs$.pipe(
      map((remainingMs: number) => {
        if (remainingMs < 1) {
          this._numbers.hideAll();
        }
      })
    ).subscribe();
  }

  restart(): void {
    // TODO: improve this
    window.location.reload();
  }
  
  private passedLevel(): void {
    this._messages.send('Great job!', MessageType.SUCCESS);
    this.showStartBtn = true;
  }

  private failedLevel(): void {
    this._numbers.disableAll();
    this._lives.takeLife();
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
