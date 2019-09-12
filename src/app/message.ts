import { MessageType } from './message-type';

export class Message {
  constructor(public text: string, public type: MessageType) {}
}
