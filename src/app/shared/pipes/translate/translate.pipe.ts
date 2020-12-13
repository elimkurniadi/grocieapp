import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private translator: TranslateService) {}

  transform(value: any, args?: any): any {
    if (!value) {
      return;
    }
    const ret = this.translator.get(value);
    return ret ? ret : value
  }
}
