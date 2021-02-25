import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(value: string): string {
    let name: string[] = value.split('-');
    const male = '\u2642',
      female = '\u2640';
    if (name.length === 2) {
      if (name[1] === 'f') {
        return `${name[0]}${female}`;
      }
      if (name[1] === 'm') {
        return `${name[0]}${male}`;
      }
    }
    return `${value}`;
  }
}
