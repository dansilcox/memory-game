import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MessageType } from '../message-type';
import { Message } from '../message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private readonly blankMessage = new Message('', MessageType.INVISIBLE);
  private currentMessage$ = new BehaviorSubject<Message>(this.blankMessage);

  constructor() { }

  send(message: string, type: MessageType): void {
    this.currentMessage$.next(new Message(message,type));
  }

  getCurrentMessage(): Observable<Message> {
    return this.currentMessage$.asObservable();
  }

  clear(): void {
    this.currentMessage$.next(this.blankMessage);
  }
}
