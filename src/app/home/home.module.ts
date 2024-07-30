import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HelloComponent } from './hello.component';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  imports: [ CommonModule, IonicModule, HomePageRoutingModule, ReactiveFormsModule],
  declarations: [ HomePage, ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
