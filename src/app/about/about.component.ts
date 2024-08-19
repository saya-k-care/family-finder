import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { GlobalConstants } from '../../environments/GlobalConstants';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})


export class AboutComponent  implements OnInit {

  constructor() { console.log("info....")}

  ngOnInit() {GlobalConstants.isAbout = true}


  filtered_ads = "https://eyebot.name.my/temp/kkm.jpg"
}
