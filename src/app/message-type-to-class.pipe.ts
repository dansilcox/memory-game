import { Pipe, PipeTransform } from '@angular/core';
import { MessageType } from './message-type';

@Pipe({
  name: 'messageTypeToClass'
})
export class MessageTypeToClassPipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    const messageTypeString = MessageType[value].toLocaleLowerCase();
    switch (messageTypeString) {
      case 'success':
        return 'success';
      case 'failure':
        return 'danger';
      case 'invisible':
        return 'hidden';
      case 'debug':
        return 'secondary';
      case 'info': 
        return 'info';
      case 'warning':
        return 'warning';
      case 'error':
        return 'danger';
    }
  }
}
