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

  features = "http://219.93.129.18:9000/app/pic/features.png"
  how = "http://219.93.129.18:9000/app/pic/how.png"
  bible_cn = "http://219.93.129.18:9000/app/pic/bible_cn.png"
  bible_en = "http://219.93.129.18:9000/app/pic/bible_en.png"
  filtered_ads = "https://eyebot.name.my/temp/kkm.jpg"

  getChinese() {
    return GlobalConstants.isChinese
  }

  getisGospel() {
    return GlobalConstants.isGospelNews
  }
}
