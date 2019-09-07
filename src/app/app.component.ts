import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  MIN_NUMBER = 1;
  MAX_NUMBER = 9;
  TOTAL_TIME_SECONDS = 10;

  hidden = [];
  livesRemaining = 3;
  title = 'Memory Game';
  numberGrid = [];
  succeeded = false;
  failed = false;

  private correctSequence = [];
  private userSequence = [];

  @ViewChild('content', {
    static: true
  })
  private content: TemplateRef<any>;

  timeRemainingMs: number;
  level = 0;
  objectKeys = Object.keys;
  
  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.open(this.content);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.startGame();
    }, () => {
      this.startGame();
    });
  }

  trackSequence(num: number): void {
    this.userSequence.push(num);
    
    if (this.correctSequence.indexOf(num) === this.userSequence.indexOf(num)) {
      // In the right order so far...
      return;
    }

    if (this.correctSequence.length === this.userSequence.length) {
      // Succeed when we get to the end of the sequence
      // If we already failed this won't be possible
      this.succeed();
      return;
    }

    // Fail if we have not broken out of this code yet
    this.fail();
  }

  succeed() {
    this.succeeded = true;
    this.endGame();
  }

  fail() {
    this.failed = true;
    if (this.livesRemaining > 0) {
      this.livesRemaining--;
      return;
    }

    this.endGame();
  }

  private startGame(): void {
    this.level++;
    this.succeeded = false;
    this.randomiseNumbers();
    this.showNumbers();
    this.startTimer();
  }

  private endGame(): void {
    if (this.succeeded) {
      this.startGame();
      return;
    }
    
  }

  private startTimer(): void {
    const intervalMs = 1; // ms
    this.timeRemainingMs = this.TOTAL_TIME_SECONDS * 1000;

    let interval = setInterval(() => {
      this.timeRemainingMs -= intervalMs * 5;
      if (this.timeRemainingMs === 0) {
        clearInterval(interval);
        this.hideNumbers();
      }
    }, intervalMs);
  }

  private randomiseNumbers(): void {
    let numbers = [];
    for (let num = this.MIN_NUMBER; num <= this.MAX_NUMBER; num++) {
      numbers.push(num);
    }
    this.correctSequence = numbers.slice();
    numbers.sort(() => Math.random() - 0.5);
    this.numberGrid = this.chunkArray(numbers, Math.sqrt(numbers.length));
  }

  private showNumbers(): void {
    this.hidden = [];
  }

  private hideNumbers() {
    this.hidden = this.correctSequence;
  }

  private chunkArray(myArray: number[], chunkSize: number): number[][] {
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
