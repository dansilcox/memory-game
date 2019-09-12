import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MessagesService } from '../messages.service';
import { LevelConfigService } from '../level-config.service';
import { UserLivesService } from '../user-lives.service';
import { TimerService } from '../timer.service';
import { Message } from '../message';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  title: string;
  
  currentLevel$: Observable<number>;
  livesRemaining$: Observable<number>;
  timeRemainingMs$: Observable<number>;

  message$: Observable<Message>;
  
  constructor(
    private _messages: MessagesService,
    private _levels: LevelConfigService,
    private _lives: UserLivesService,
    private _timer: TimerService
  ) { }

  ngOnInit() {
    this.message$ = this._messages.getCurrentMessage();
    this.currentLevel$ = this._levels.getCurrentLevel();
    this.livesRemaining$ = this._lives.getNumLives();
    this.timeRemainingMs$ = this._timer.getTimeRemaining();
  }
}
