import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FinalScore } from '../models/final-score';
import { HighScoresService } from './high-scores.service';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {
  private currentScore = 0;
  private currentScore$ = new BehaviorSubject<number>(this.currentScore);

  constructor(private _highScores: HighScoresService) { }

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
    this._highScores.save(new FinalScore(score, name));
  }

  isHighScore(score: number) {
    return this._highScores.isHighScore(score);
  }

  isNewRecord(score: number) {
    return this._highScores.isNewRecord(score);
  }
}
