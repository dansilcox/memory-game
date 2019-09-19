import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MessagesService } from './messages.service';
import { MessageType } from '../message-type';

const INITIAL_LIVES = 3;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username: string = '';
  private username$ = new BehaviorSubject<string>(this.username);
  private lives = INITIAL_LIVES;

  private livesRemaining$ = new BehaviorSubject<number>(this.lives);

  constructor(private _messages: MessagesService) { }

  setName(username: string): void {
    if (username.length < 1) {
      username = UserService.generateRandomUsername();
    }
    console.log("Setting username as " + username);
    this.username = username;
    this.username$.next(this.username);
  }
  
  getName(): Observable<string> {
    return this.username$.asObservable();
  }
  getNameAsString(): string {
    return this.username;
  }

  reset(): void {
    this.setName('');
    this.lives = INITIAL_LIVES;
    this.livesRemaining$.next(this.lives);
  }

  getNumLives(): Observable<number> {
    return this.livesRemaining$.asObservable();
  }

  getNumLivesAsNumber(): number {
    return this.lives;
  }

  giveLives(numLives = 1): void {
    this.lives++;
    this.livesRemaining$.next(this.lives);
  }

  takeLives(numLives = 1): void {
    if (this.lives === 0) {
      this._messages.send('No more lives remaining', MessageType.WARNING);
      return;
    }
    this.lives--;
    this.livesRemaining$.next(this.lives);
  }

  private static generateRandomUsername(): string {
    const wordPool = [
      'CHIMP',
      'AYUMU',
      'BANANA',
      'KONG',
      'FOSSEY',
      'TROGLODITE',
      'GOODALL'
    ];
    return wordPool[UserService.getRandomInt(0, wordPool.length - 1)];
  }

  private static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
