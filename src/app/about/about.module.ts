import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AboutRoutingModule } from './about-routing.module';
import { MapPage } from '../map/map.page';
import { HelloComponent } from '../home/hello.component';
import { AboutComponent } from './about.component';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [ CommonModule, IonicModule, ReactiveFormsModule, AboutRoutingModule, HeaderModule],
  declarations: [  AboutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AboutModule {}
