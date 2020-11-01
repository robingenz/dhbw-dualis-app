import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grade',
})
export class GradePipe implements PipeTransform {
  public transform(value: string, ...args: unknown[]): string {
    if (value === 'noch nicht gesetzt') {
      value = '-';
    }
    return value;
  }
}
