import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderModule } from '../header/header.module';
import { AccorBoxModule } from '../accor-box/accor-box.module';

@NgModule({
  imports: [ CommonModule, IonicModule, HomePageRoutingModule, ReactiveFormsModule, FormsModule , HeaderModule, AccorBoxModule],
  declarations: [ HomePage, ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
