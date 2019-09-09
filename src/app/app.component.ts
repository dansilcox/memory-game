import { Component, OnInit } from '@angular/core';
import { TimerService } from './timer.service';
import { map } from 'rxjs/operators';
import { LevelConfigService } from './level-config.service';
import { LevelConfig } from './level-config';
import { NumbersService } from './numbers.service';
import { Observable } from 'rxjs';
import { NumberStatus } from './number-status';
import { UserLivesService } from './user-lives.service';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Memory Game';
  showRetryBtn = false;
  showStartBtn = false;
  
  private timeRemainingMs$: Observable<number>;
  private levelConfig: LevelConfig;
  
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
        console.log('Next level...');
        console.log(level);
        this.levelConfig = level;
        this._numbers.reset();
        this._numbers.randomise(this.levelConfig.getGridMinNumber(), this.levelConfig.getGridMaxNumber());
      })
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
          // ...
        }
        return status;
      })
    ).subscribe();
  }

  startGame(): void {
    this._numbers.showAll();
    this._numbers.enableAll();
    this._timer.start(this.levelConfig.getAllowedTimeMs());
    this.timeRemainingMs$.pipe(
      map((remainingMs: number) => {
        if (remainingMs < 1) {
          this._numbers.hideAll();
        }
      })
    ).subscribe();
  }

  private passedLevel(): void {
    console.info('PASSED!');
    this._levels.nextLevel();
    this.showStartBtn = true;
  }

  private failedLevel(): void {
    console.error('Failed!');
    this._numbers.disableAll();
    this._lives.takeLife();
    const livesRemaining = this._lives.getNumLivesAsNumber();
    this.showRetryBtn = true;
    this._messages.send('Better luck next time - ' + livesRemaining + ' lives left')
  }
}
