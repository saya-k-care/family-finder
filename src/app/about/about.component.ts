import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { GlobalConstants } from '../../environments/GlobalConstants';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})


export class AboutComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer,) { console.log("info....") }

  ngOnInit() { GlobalConstants.isAbout = true }

  features = "https://eyebot.name.my/pic/features.png"
  how = "https://eyebot.name.my/pic/how.png"
  bible_cn = "https://eyebot.name.my/pic/bible_cn.png"
  bible_en = "https://eyebot.name.my/pic/bible_en.png"
  filtered_ads = "https://eyebot.name.my/temp/kkm.jpg"

  getChinese() {
    return GlobalConstants.isChinese
  }

  getisGospel() {
    return GlobalConstants.isGospelNews
  }
}
