import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccorComponent } from './accor.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@NgModule({
    declarations: [AccorComponent],
    exports: [AccorComponent],
    imports: [
      CommonModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
export class AccorModule { }
