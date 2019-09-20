import { Injectable } from '@angular/core';
import { FinalScore } from '../models/final-score';
import { Observable, BehaviorSubject } from 'rxjs';
import { IpcRendererService } from './ipc-renderer.service';
import { IpcMessageEvent } from 'electron';

const MAX_HIGH_SCORES = 10;

@Injectable({
  providedIn: 'root'
})
export class HighScoresService {
  private highScores: FinalScore[] = [];
  private highScores$ = new BehaviorSubject<FinalScore[]>(this.highScores);

  constructor(private _ipc: IpcRendererService) {
    this._ipc.on('high_scores_updated', (event: IpcMessageEvent, data: any) => {
      this.highScores = data;
      this.highScores$.next(this.highScores);
    })
   }

  save(score: FinalScore): boolean {
    this._ipc.send('save_high_score', score);
    return true;
  }

  getHighScores(): Observable<FinalScore[]> {
    return this.highScores$.asObservable();
  }

  isHighScore(score: number) {
    // If we've filled the quota of high scores, only allow us to add it 
    // if it's bigger than the bottom high score
    if (this.highScores.length >= MAX_HIGH_SCORES) {
      return this.highScores[MAX_HIGH_SCORES - 1].score < score;
    }

    return true;
  }

  isNewRecord(score: number) {
    return this.highScores[0].score < score;
  }
}
