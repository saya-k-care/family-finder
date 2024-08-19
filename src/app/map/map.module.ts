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
import { HelloComponent } from '../home/hello.component';
import { HeaderModule } from '../header/header.module';
import { AccorBoxModule } from '../accor-box/accor-box.module';
import { URLNewsModule } from '../../alertbox/news-url.module';

@NgModule({
  imports: [CommonModule, IonicModule, MapPageRoutingModule, ReactiveFormsModule, FormsModule , HeaderModule, AccorBoxModule, URLNewsModule],
  declarations: [ HelloComponent, MapPage, AccorComponent, NewsComponent, URLExtractComponent,CareTakerHistory, ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapPageModule {}
