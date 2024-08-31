import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NewsComponent } from '../news/news.component';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [CommonModule, MapPageRoutingModule , HeaderModule],
  declarations: [ MapPage, NewsComponent, ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapPageModule {}
