import {NgModule} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewsComponent } from './news.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@NgModule({
    declarations: [NewsComponent,],
    exports: [NewsComponent, ],
    imports: [
      CommonModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
export class NewsModule { 

}
