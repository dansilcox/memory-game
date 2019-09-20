import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimerService } from '../services/timer.service';
import { MessagesService } from '../services/messages.service';
import { Message } from '../message';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input()
  title: string;

  gameInProgress = false;
  message$: Observable<Message>;

  private timeRemaining$: Observable<number>;
  private timeRemainingSub$: Subscription;

  constructor(private _timer: TimerService, private _msg: MessagesService) {}

  ngOnInit() {
    this.timeRemaining$ = this._timer.getTimeRemaining();
    this.timeRemainingSub$ = this.timeRemaining$.pipe(
      map((timeRemaining: number) => this.gameInProgress = timeRemaining > 0)
    ).subscribe();
    this.message$ = this._msg.getCurrentMessage();
  }

  ngOnDestroy(): void {
    if (!this.timeRemainingSub$.closed) {
      this.timeRemainingSub$.unsubscribe();
    }
  }
}
