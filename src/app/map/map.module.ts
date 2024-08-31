import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NewsComponent } from '../news/news.component';
import { HeaderModule } from '../header/header.module';
import { URLExtractComponent } from '../util/urlextract.component';
import { AccorBoxModule } from '../accor-box/accor-box.module';

@NgModule({
  imports: [CommonModule, MapPageRoutingModule , HeaderModule, AccorBoxModule],
  declarations: [ MapPage, NewsComponent , URLExtractComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapPageModule {}
