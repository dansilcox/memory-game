import { Component, OnInit } from '@angular/core';
import { NumbersService } from '../numbers.service';
import { Observable } from 'rxjs';
import { NumberGridItem } from '../number-grid-item';

@Component({
  selector: 'app-number-grid',
  templateUrl: './number-grid.component.html',
  styleUrls: ['./number-grid.component.scss']
})
export class NumberGridComponent implements OnInit {

  numberGrid$: Observable<NumberGridItem[][]>;

  constructor(private _numbers: NumbersService) { }

  ngOnInit() {
    this.numberGrid$ = this._numbers.getRandomised()
  }

  trackSequence(item: NumberGridItem): void {
    item.hidden = false;
    this._numbers.trackSequence(item);
  }
}
