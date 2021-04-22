import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Sector } from 'sng-core';

@Pipe({
  name: 'content_translate',
  pure: false,
})
export class ContentTranslatePipe implements PipeTransform {
  constructor(public translate: TranslateService) { }

  transform(value: Sector, args?: string): any {

    const lang = this.translate.currentLang;
    return value[`${lang}_${args}`];
  }
}
