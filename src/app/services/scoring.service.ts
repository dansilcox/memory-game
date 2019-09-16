import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FinalScore } from '../models/final-score';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {
  private scoresOnTheDoors: FinalScore[] = [];
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
    this.currentScore += incrementValue;
    this.currentScore$.next(this.currentScore);
    return this.currentScore;
  }

  saveScore(score: number, name: string): void {
    this.scoresOnTheDoors.push(new FinalScore(score, name));
  }

  getScoresOnTheDoors(): FinalScore[] {
    return this.scoresOnTheDoors.sort((a: FinalScore, b: FinalScore) => {
      return a.score > b.score ? 1 : -1;
    });
  }
}
