import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import "@angular/compiler";
import { AlertboxComponent } from 'src/alertbox/alertbox.component';
import { HelloComponent } from './hello.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  formGroup: FormGroup;
  alertboxComponent: any;
  name: any = "testing...."
  ai_bible: any = "\"Unless the Lord builds the house, the builders labor in vain.\" - Psalm 127:1, reflecting on new foundations and challenges."
  ai_cn: any = "在尼希米记第2章中，尼希米面临重建耶路撒冷城墙的巨大挑战。他在采取行动之前祈祷并寻求上帝的引导，表明没有神的支持，即使是最坚定的努力也可能失败。他对上帝的依赖使他在巨大的反对面前成功恢复了城墙。";
  ai_en: any = "\"Unless the Lord builds the house, the builders labor in vain.\" - Psalm 127:1, reflecting on new   foundations and challenges."
  ai_en_story: any = "AI Bible Story ❝ In the story of Naboth's vineyard (1 Kings 21), King Ahab sought to unjustly take Naboth's land. Through the evidence of false witnesses, Naboth was wrongfully condemned. However, God exposed the truth, leading to justice for Naboth and punishment for Ahab, showing that truth ultimately reveals justice. ❞"
  ai_pinyin = "Pīnyīn ❝ zài ná bó de pú táo yuán gù shì zhōng (liè wáng jì shàng 21 zhāng), yà hā wáng shì tǐng bù gōng zhèng de duó qǔ ná bó de tǔ dì. tōng guò wěi zhèng de zhèng jù, ná bó bèi cuò wù de dìng zuì. rán ér, shàng dì jiē lù le zhēn xiàng, shǐ ná bó dé yǐ shēn zhāng zhèng yì, ér yà hā zé shòu dào chéng fá, xiǎn shì zhēn xiàng zhōng yú jiē shì le zhèng yì. ❞"
  ai_well_being: any = "❝ Shah Firdaus has successfully advanced through several rounds in cycling events at the Paris Olympics, including reaching the semi-finals and quarter-finals in the keirin competition, keeping his gold medal hopes alive as Malaysia's last hope on the final day. ❞"
  constructor(
    // public helloComponent: HelloComponent,
    public formBuilder: FormBuilder, private alertController: AlertController, public http: HttpClient, private router: Router,) {
    this.formGroup = formBuilder.group({
      care_taker_email: [
        "",
        Validators.compose([
          Validators.minLength(1),
          Validators.pattern("^null|$"),
          Validators.required
        ])
      ],
      care_taker_password: [
        "",
        Validators.compose([
          Validators.minLength(1),
          Validators.pattern("^null|$"),
          Validators.required
        ])
      ]
    });
    this.alertboxComponent = new AlertboxComponent(this.alertController);
  }

  bible_example_accordion_expanded: any = false
  analysis_accordion_expanded: any = false
  analysis_ai_expanded: any = false
  pinyin_accordion_expanded = false
  toggle_symbol(expanded: any, length: any) {

    if (length < 40) {
      return ""
    }
    if (expanded) {
      return ("[-]")
    }
    else {
      return ("[+]")
    }
  }

  toggle_accordion() {
    this.bible_example_accordion_expanded = this.bible_example_accordion_expanded === false;
  }

  toggle_analysis() {
    this.analysis_accordion_expanded = this.analysis_accordion_expanded === false;
  }

  toggle_ai() {
    this.analysis_ai_expanded = this.analysis_ai_expanded === false;
  }

  toggle_pinyin() {
    this.pinyin_accordion_expanded = this.pinyin_accordion_expanded === false;
  }

  isChinese() {
    return GlobalConstants.isChinese;
  }

  isBahasa() {
    return GlobalConstants.isBahasa;
  }

  isGospel() {
    return GlobalConstants.is_gospel;
  }
}
