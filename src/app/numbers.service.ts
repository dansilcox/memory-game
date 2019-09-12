import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { NumberGridItem } from './number-grid-item';
import { NumberStatus } from './number-status';
import { UserLivesService } from './user-lives.service';

@Injectable({
  providedIn: 'root'
})
export class NumbersService {
  private readonly DEBUG_MODE = false;

  private userSequence: NumberGridItem[];
  private correctSequence: NumberGridItem[];
  private numberGrid: NumberGridItem[][];
  private numberGrid$ = new BehaviorSubject<NumberGridItem[][]>(this.numberGrid);
  
  status$ = new BehaviorSubject<NumberStatus>(NumberStatus.NOT_STARTED);

  constructor() { 
    this.reset();
  }

  reset(): void {
    this.correctSequence = [];
    this.userSequence = [];
    this.numberGrid = [];
    this.hideAll();
    this.enableAll();
    this.status$.next(NumberStatus.NOT_STARTED);
  }

  getStatus(): Observable<NumberStatus> {
    return this.status$.asObservable();
  }
  
  randomise(min: number, max: number) {
    this.status$.next(NumberStatus.NOT_STARTED);
    console.log('Randomising number grid between ' + min + ' and ' + max);
    let numbers = [];
    for (let num = min; num <= max; num++) {
      numbers.push(new NumberGridItem(num));
    }
    this.correctSequence = numbers.slice();
    numbers.sort(() => Math.random() - 0.5);
    this.numberGrid = this.chunkArray(numbers, Math.sqrt(numbers.length));
    this.numberGrid$.next(this.numberGrid);
  }

  getRandomised(): Observable<NumberGridItem[][]> {
    return this.numberGrid$;
  }

  debugEnabled(): boolean {
    return this.DEBUG_MODE;
  }

  showAll() {
    console.log('Showing all numbers');
    this.status$.next(NumberStatus.NUMBERS_VISIBLE);
    this.numberGrid.forEach((row) => row.forEach((item: NumberGridItem) => item.hidden = false));
    this.numberGrid$.next(this.numberGrid);
  }

  hideAll() {
    console.log('Hiding all numbers');
    this.status$.next(NumberStatus.SEQUENCE_OK_SO_FAR);
    this.numberGrid.forEach((row) => row.forEach((item: NumberGridItem) => item.hidden = true));
    this.numberGrid$.next(this.numberGrid);
  }

  disableAll() {
    console.log('Disabling all numbers');
    this.numberGrid.forEach((row) => row.forEach((item: NumberGridItem) => item.disabled = true));
    this.numberGrid$.next(this.numberGrid);
  }

  enableAll() {
    console.log('Enabling all numbers');
    this.numberGrid.forEach((row) => row.forEach((item: NumberGridItem) => item.disabled = false));
    this.numberGrid$.next(this.numberGrid);
  }

  trackSequence(item: NumberGridItem): boolean {
    console.log(this.userSequence);
    console.log(this.correctSequence);
    this.userSequence.push(item);
    if (this.correctSequence.length < this.numberGrid.length) {
      console.error('Hmm something weird going on...');
      console.debug(this.correctSequence);
      console.debug(this.numberGrid);
      this.userSequence = [];
      return false;
    }
    if (this.userSequence.indexOf(item) !== this.correctSequence.indexOf(item)) {
      // mismatch
      this.status$.next(NumberStatus.FAILED_LEVEL);
      this.userSequence = [];
      return false;
    }
    if (this.userSequence.length === this.correctSequence.length) {
      // at the end
      this.status$.next(NumberStatus.PASSED_LEVEL);
      return true;
    }
    this.status$.next(NumberStatus.SEQUENCE_OK_SO_FAR);
    return true;
  }
  
  private chunkArray(myArray: NumberGridItem[], chunkSize: number): NumberGridItem[][] {
    let index = 0;
    let arrayLength = myArray.length;
    let tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunkSize) {
        const myChunk = myArray.slice(index, index + chunkSize);
        tempArray.push(myChunk);
    }

    return tempArray;
  }
}
