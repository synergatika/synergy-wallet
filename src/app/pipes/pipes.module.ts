import { NgModule } from '@angular/core';

import { ContentTranslatePipe } from './content_translate.pipe';
import { SectorFilterPipe } from './sector.pipe';

@NgModule({
  imports: [],
  declarations: [ContentTranslatePipe, SectorFilterPipe,],
  exports: [ContentTranslatePipe, SectorFilterPipe,],
})
export class PipesModule { }
