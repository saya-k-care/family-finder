import {NgModule} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewsComponent } from './news.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { URLNewsComponent } from '../../util/news-url.component';
import { AccorBoxModule } from '../accor-box/accor-box.module';

@NgModule({
    declarations: [NewsComponent, URLNewsComponent],
    exports: [NewsComponent, ],
    imports: [
      CommonModule, AccorBoxModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
export class NewsModule { 

}
