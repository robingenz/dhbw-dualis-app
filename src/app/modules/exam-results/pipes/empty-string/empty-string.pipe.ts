import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyString',
})
export class EmptyStringPipe implements PipeTransform {
  public transform(value: string, ...args: unknown[]): string {
    if (value.length < 1) {
      value = '-';
    }
    return value;
  }
}
