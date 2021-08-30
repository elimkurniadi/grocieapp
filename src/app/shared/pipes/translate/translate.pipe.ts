import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private translator: TranslateService) {}

  transform(value: any, args?: object): any {
    if (!value) {
      return;
    }
    const ret = this.translator.get(value, args);
    return ret ? ret : value;
  }
}
