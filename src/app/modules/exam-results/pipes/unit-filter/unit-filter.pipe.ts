import { Pipe, PipeTransform } from '@angular/core';
import { Unit } from '../../interfaces';

@Pipe({
  name: 'unitFilter',
})
export class UnitFilterPipe implements PipeTransform {
  public transform(units: Unit[], searchValue: string): Unit[] {
    console.log({ units, searchValue });
    if (!searchValue) {
      return units;
    }
    return units.filter(unit => {
      if (this.objectContainsString(unit, searchValue)) {
        return unit;
      }
    });
  }

  private objectContainsString(obj: any, str: string): boolean {
    str = str.toLowerCase();
    for (const key in obj) {
      if (typeof obj[key] === 'string' || typeof obj[key] === 'number') {
        if (obj[key].toString().toLowerCase().includes(str)) {
          return true;
        }
      } else if (typeof obj[key] === 'object' && this.objectContainsString(obj[key], str)) {
        return true;
      }
    }
    return false;
  }
}
