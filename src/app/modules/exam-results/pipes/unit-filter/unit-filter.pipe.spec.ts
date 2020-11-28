import { Unit } from '../../interfaces';
import { UnitFilterPipe } from './unit-filter.pipe';

describe('UnitFilterPipe', () => {
  let pipe: UnitFilterPipe;

  beforeEach(() => {
    pipe = new UnitFilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly', () => {
    const units: Unit[] = [
      {
        id: '111222111222111',
        displayName: 'Wissenschaftliches Arbeiten',
        no: 'WWI_100',
        status: 'bestanden',
        credits: '5,0',
        finalGrade: 'b',
        exams: undefined,
      },
    ];
    let val = pipe.transform(units, 'bestanden');
    expect(val.length).toBe(1);
    val = pipe.transform(units, 'Wissen');
    expect(val.length).toBe(1);
    val = pipe.transform(units, '100');
    expect(val.length).toBe(1);
    val = pipe.transform(units, '4,0');
    expect(val.length).toBe(0);
  });
});
