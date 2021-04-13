import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Sector } from 'sng-core';

@Pipe({
  name: 'sector_filter',
  pure: false,
})
export class SectorFilterPipe implements PipeTransform {
  constructor(public translate: TranslateService) { }

  transform(value: string, args?: Sector[]): any {
    const lang = this.translate.currentLang;

    const sector: Sector = args.filter((o) => { return o._id == value })[0];
    return sector[`${lang}_title`];
  }
}
