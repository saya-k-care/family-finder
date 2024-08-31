import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { URLNewsComponent } from './news-url.component';

@NgModule({
    declarations: [URLNewsComponent],
    exports: [URLNewsComponent],
    imports: [
      CommonModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
export class URLNewsModule { }
