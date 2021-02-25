import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'meter',
})
export class MeterPipe implements PipeTransform {
  private _types = { cm: 0.01, dm: 0.1, m: 1 };

  transform(value: number, type: string): string {
    let meters = this.getMeters(value, type);
    return `${meters.toFixed(2)} m`;
  }

  getMeters(value: number, type: string): number {
    let conversion = this._types[type];
    if (conversion == null) {
      throw new Error('Could not find type');
    } else {
      return value * conversion;
    }
  }
}
