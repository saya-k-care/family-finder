import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HelloComponent } from './hello.component';
import { HeaderComponent } from '../header/header.component';
import { MapPageRoutingModule } from '../map/map-routing.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [ CommonModule, IonicModule, HomePageRoutingModule, ReactiveFormsModule, FormsModule , HeaderModule],
  declarations: [ HomePage, ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
