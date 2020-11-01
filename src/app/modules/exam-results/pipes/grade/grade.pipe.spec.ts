import { GradePipe } from './grade.pipe';

describe('GradePipe', () => {
  let pipe: GradePipe;

  beforeEach(() => {
    pipe = new GradePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly', () => {
    let val = pipe.transform('noch nicht gesetzt');
    expect(val).toBe('-');
    val = pipe.transform('test');
    expect(val).toBe('test');
  });
});
