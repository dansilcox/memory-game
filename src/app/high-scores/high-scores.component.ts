import { Component, OnInit } from '@angular/core';
import { ScoringService } from '../services/scoring.service';
import { Observable } from 'rxjs';
import { FinalScore } from '../models/final-score';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.scss']
})
export class HighScoresComponent implements OnInit {

  highScores$: Observable<FinalScore[]>;

  constructor(private _scores: ScoringService) { }

  ngOnInit() {
    this.highScores$ = this._scores.getHighScores();
  }
}
