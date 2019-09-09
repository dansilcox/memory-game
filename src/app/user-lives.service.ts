import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessagesService } from './messages.service';

const MAX_LIVES = 3;

@Injectable({
  providedIn: 'root'
})
export class UserLivesService {

  private lives = MAX_LIVES;

  constructor(private _messages: MessagesService) { }

  getNumLives(): Observable<number> {
    return of(this.lives);
  }

  getNumLivesAsNumber(): number {
    return this.lives;
  }

  takeLife(): void {
    if (this.lives === 0) {
      this._messages.send('No more lives remaining');
      return;
    }
    this.lives--;
  }
}
