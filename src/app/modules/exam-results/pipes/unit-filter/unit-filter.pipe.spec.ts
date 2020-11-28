import { UnitFilterPipe } from './unit-filter.pipe';

describe('UnitFilterPipe', () => {
  let pipe: UnitFilterPipe;

  beforeEach(() => {
    pipe = new UnitFilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
