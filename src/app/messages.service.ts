import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  send(message: string): void {
    // TODO
  }

  getCurrentMessage(): Observable<string> {
    return of(''); // TODO
  }
}
