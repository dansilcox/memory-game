import { MessageTypeToClassPipe } from './message-type-to-class.pipe';

describe('MessageTypeToClassPipe', () => {
  it('create an instance', () => {
    const pipe = new MessageTypeToClassPipe();
    expect(pipe).toBeTruthy();
  });
});
