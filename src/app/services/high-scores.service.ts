import { Injectable } from '@angular/core';
import { FinalScore } from '../models/final-score';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { IpcRendererService } from './ipc-renderer.service';
import { IpcMessageEvent } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class HighScoresService {
  private highScores: FinalScore[] = [];
  private highScores$ = new BehaviorSubject<FinalScore[]>(this.highScores);

  constructor(private _ipc: IpcRendererService) {
    this._ipc.on('high_scores_updated', (event: IpcMessageEvent, data: any) => {
      console.log(event);
      console.log(data);
      this.highScores = data;
      console.log('high scores updated - new list received...');
      console.log(data);
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
}
