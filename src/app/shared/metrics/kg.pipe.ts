import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kg'
})

export class KgPipe implements PipeTransform {
  private _types = {'cg': 0.01, 'dg': 0.1, 'g': 1, 'dag': 10, 'hg': 100, 'kg': 1000};
  private _kgPerGram: number = 0.001;

  transform(value: number, type: string, decimals: number): string {
    let grams = this.getGrams(value, type),
        kgs = grams * this._kgPerGram;
    return `${kgs.toFixed(1)} kg`;
  }

  getGrams(value: number, type: string): number {
    let conversion = this._types[type];
    if (conversion == null) {
      throw new Error('Could not find type');
    } else {
      return value * conversion;
    }
  }
}
