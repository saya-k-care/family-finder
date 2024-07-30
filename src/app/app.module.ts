import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ReactiveFormsModule } from '@angular/forms';
import "@angular/compiler";
import { HeaderComponent } from './header/header.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent, ],

  imports: [  BrowserModule, ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Geolocation,DatePipe], 
  bootstrap: [AppComponent],
  exports: [
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
