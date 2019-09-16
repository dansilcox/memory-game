import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private timeRemainingMs$ = new Subject<number>();

  constructor() { }

  start(allowedTimeMs: number): void {
    const intervalMs = 1; // ms

    let timeRemainingMs = allowedTimeMs;

    let interval = setInterval(() => {
      timeRemainingMs -= intervalMs * 5; // Calibrate the timer to match with real time
      this.timeRemainingMs$.next(timeRemainingMs);
      if (timeRemainingMs === 0) {
        clearInterval(interval);
      }
    }, intervalMs);
  }

  getTimeRemaining(): Observable<number> {
    return this.timeRemainingMs$.asObservable();
  }
}
