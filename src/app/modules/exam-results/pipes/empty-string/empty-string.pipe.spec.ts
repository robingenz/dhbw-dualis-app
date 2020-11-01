import { EmptyStringPipe } from './empty-string.pipe';

describe('EmptyStringPipe', () => {
  it('create an instance', () => {
    const pipe = new EmptyStringPipe();
    expect(pipe).toBeTruthy();
  });
});
