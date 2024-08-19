import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccorBoxComponent } from './accor-box.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@NgModule({
    declarations: [AccorBoxComponent],
    exports: [AccorBoxComponent],
    imports: [
      CommonModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
export class AccorBoxModule { }
