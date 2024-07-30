import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccorComponent } from '../accor/accor.component';
import { URLExtractComponent } from 'src/alertbox/urlextract.component';
import { CareTakerHistory } from 'src/alertbox/caretakerhistory.component';
import { NewsComponent } from '../news/news.component';
import { URLNewsComponent } from '../../alertbox/news-url.component';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  imports: [CommonModule, IonicModule, MapPageRoutingModule, ReactiveFormsModule, FormsModule ],
  declarations: [MapPage, AccorComponent, NewsComponent, URLNewsComponent, URLExtractComponent,CareTakerHistory],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapPageModule {}
