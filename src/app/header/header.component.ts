import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MessagesService } from '../services/messages.service';
import { LevelConfigService } from '../services/level-config.service';
import { UserLivesService } from '../services/user-lives.service';
import { TimerService } from '../services/timer.service';
import { Message } from '../message';
import { ScoringService } from '../services/scoring.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  title: string;
  
  currentLevel$: Observable<number>;
  currentScore$: Observable<number>;
  livesRemaining$: Observable<number>;
  timeRemainingMs$: Observable<number>;
  isHighScore = false;
  isNewRecord = false;

  message$: Observable<Message>;
  
  constructor(
    private _messages: MessagesService,
    private _levels: LevelConfigService,
    private _lives: UserLivesService,
    private _timer: TimerService,
    private _scores: ScoringService
  ) { }

  ngOnInit() {
    this.message$ = this._messages.getCurrentMessage();
    this.currentLevel$ = this._levels.getCurrentLevelIndex();
    this.livesRemaining$ = this._lives.getNumLives();
    this.timeRemainingMs$ = this._timer.getTimeRemaining();
    this.currentScore$ = this._scores.getCurrentScore().pipe(
      tap((score: number) => {
        // TODO: fix this logic
        if (score > 1000) {
          this.isHighScore = true;
        }
        if (score > 10000) {
          this.isNewRecord = true;
        }
        return score;
      })
    );
  }
}
