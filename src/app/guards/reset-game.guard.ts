import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MainGameComponent } from '../main-game/main-game.component';
import { TimerService } from '../services/timer.service';
import { NumbersService } from '../services/numbers.service';
import { ScoringService } from '../services/scoring.service';
import { LevelConfigService } from '../services/level-config.service';
import { UserService } from '../services/user.service';
import { MessagesService } from '../services/messages.service';
import { MessageType } from '../message-type';

@Injectable({
  providedIn: 'root'
})
export class ResetGameGuard implements CanDeactivate<MainGameComponent> {
  constructor(
    private _timer: TimerService,
    private _user: UserService,
    private _level: LevelConfigService,
    private _numbers: NumbersService,
    private _scores: ScoringService,
    private _msg: MessagesService) {
  }

  canDeactivate(
    component: MainGameComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): boolean {
    // TODO: make this prettier...
    if (!confirm('Navigating away will reset the game - continue?')) {
      return false;
    }

    this._msg.send('Resetting game...', MessageType.WARNING);
    this._level.startAgain();
    this._numbers.reset();
    this._scores.resetCurrent();
    this._timer.clear();
    this._user.reset();

    return true;
  }
}
