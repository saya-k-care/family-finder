import { NgModule } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        IonicModule
      ],
    declarations: [
        HeaderComponent,
      ],
      exports: [
        HeaderComponent,
      ]
})
export class HeaderModule {}
