import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FinalScore } from '../models/final-score';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {
  private highScores: FinalScore[] = [];
  private currentScore = 0;
  private currentScore$ = new BehaviorSubject<number>(this.currentScore);

  constructor() { }

  /**
   * Get the current score
   */
  getCurrentScore(): Observable<number> {
    return this.currentScore$.asObservable();
  }

  /**
   * Increment the current score
   * 
   * @param incrementValue Increment score by this value (integer)
   * @return The new score
   */
  incrementScore(incrementValue: number): number {
    console.log(this.currentScore);
    this.currentScore += incrementValue;
    console.log(this.currentScore);
    this.currentScore$.next(this.currentScore);
    return this.currentScore;
  }

  resetCurrent(): void {
    console.log(this.currentScore);
    this.currentScore = 0;
    console.log(this.currentScore);
    this.currentScore$.next(this.currentScore);
  }
  
  saveCurrentScore(name: string): void {    
    this.saveScore(this.currentScore, name);
  }
  
  saveScore(score: number, name: string): void {
    if (score <= 0) {
      console.error('Not saving score of ' + score + ' for user ' + name + ' as it is <= 0');
      return;
    }

    console.debug('Saving score of ' + score + ' for user ' + name);
    this.highScores.push(new FinalScore(score, name));
  }

  getHighScores(): Observable<FinalScore[]> {
    return of(this.highScores.sort((a: FinalScore, b: FinalScore) => {
      return a.score > b.score ? 1 : -1;
    }));
  }
}
