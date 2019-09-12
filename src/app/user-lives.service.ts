import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MessagesService } from './messages.service';
import { MessageType } from './message-type';

const MAX_LIVES = 3;

@Injectable({
  providedIn: 'root'
})
export class UserLivesService {

  private lives = MAX_LIVES;

  private livesRemaining$ = new BehaviorSubject<number>(MAX_LIVES);

  constructor(private _messages: MessagesService) { }

  getNumLives(): Observable<number> {
    return this.livesRemaining$.asObservable();
  }

  getNumLivesAsNumber(): number {
    return this.lives;
  }

  takeLife(): void {
    if (this.lives === 0) {
      this._messages.send('No more lives remaining', MessageType.WARNING);
      return;
    }
    this.lives--;
    this.livesRemaining$.next(this.lives);
  }
}
