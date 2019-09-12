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
  DEBUG_MODE: boolean;

  numberGrid$: Observable<NumberGridItem[][]>;

  constructor(private _numbers: NumbersService) { }

  ngOnInit() {
    this.numberGrid$ = this._numbers.getRandomised()
    this.DEBUG_MODE = this._numbers.debugEnabled();
  }

  trackSequence(item: NumberGridItem, event: any): void {
    var target = event.target || event.srcElement || event.currentTarget;
    // TODO: add class for success/fail so far to target
    var idAttr = target.attributes.id;
    console.log(idAttr);
    item.hidden = false;
    const successSoFar = this._numbers.trackSequence(item);
  }
}
