import { Component, OnInit } from '@angular/core';
import { ScoringService } from '../services/scoring.service';
import { Observable } from 'rxjs';
import { FinalScore } from '../models/final-score';
import { HighScoresService } from '../services/high-scores.service';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.scss']
})
export class HighScoresComponent implements OnInit {

  highScores$: Observable<FinalScore[]>;

  constructor(private _scores: HighScoresService) { }

  ngOnInit() {
    this.highScores$ = this._scores.getHighScores();
  }
}
