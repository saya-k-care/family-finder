import { NgModule } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        AdsenseModule
      ],
    declarations: [
        HeaderComponent,
      ],
      exports: [
        HeaderComponent,
      ]
})
export class HeaderModule {}
