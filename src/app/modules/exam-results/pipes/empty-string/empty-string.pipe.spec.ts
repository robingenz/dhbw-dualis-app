import { EmptyStringPipe } from './empty-string.pipe';

describe('EmptyStringPipe', () => {
  let pipe: EmptyStringPipe;

  beforeEach(() => {
    pipe = new EmptyStringPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly', () => {
    let val = pipe.transform('');
    expect(val).toBe('-');
    val = pipe.transform('test');
    expect(val).toBe('test');
  });
});
