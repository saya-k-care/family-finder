import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { HeaderModule } from '../header/header.module';
import { URLNewsModule } from '../util/news-url.module';

@NgModule({
  imports: [ CommonModule, IonicModule, ReactiveFormsModule, AboutRoutingModule, HeaderModule, URLNewsModule],
  declarations: [  AboutComponent, ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AboutModule {}
