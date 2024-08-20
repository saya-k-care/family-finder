import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import "@angular/compiler";
import { CareTakerService } from '../service/caretaker.service';
import { NewsService } from '../service/news.service';
import { DatePipe } from '@angular/common';
import { GlobalConstants } from '../../environments/GlobalConstants';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  @Input() expanded = false;
  @Input() expandHeight: any;
  @Input() message: any;
  @Input() arrays: any;
  @Input() isGospelNews: any;

  filtered_ads = "https://www.youtube.com/embed/FsRMjJJoy24"
  headline: any = "https://paris2024.rtm.gov.my/pingat"
  tv: any = "https://olympics.bwfbadminton.com/results/4752/paris-2024-olympic-games-badminton-competition/" + this.get_today_date();
  news_arrays: any;
  news_sport_arrays: any;
  bible_example_accordion_expanded: any = false

  prediction_accordion_expanded: any = false
  analysis_accordion_expanded: any = false
  pinyin_accordion_expanded = false
  analysis_ai_expanded = false

  constructor(private newsService: NewsService, private datePipe: DatePipe) { }
  ngOnInit() {
    if (this.isGospelNews) {
      GlobalConstants.is_gospel = true;
      GlobalConstants.isGospelNews = true;
      GlobalConstants.isChinese = false;
      GlobalConstants.isBahasa = false;
      GlobalConstants.isAbout = false;
    }
    this.getNews(true);
    this.getNewsSports();
  }

  replaceCNTuple(str: any) {
    try {

      str = JSON.stringify(str)
      str = str.replace('{"py/tuple":[["', '');
      str = str.replace('"]', '');
      str = str.replace(']}', '');
    } catch (e) {
      console.log(e);
    }
    return str
  }

  toggle_sport() {
    if (GlobalConstants.is_sport == true) {
      GlobalConstants.is_sport = false;
    }
    else {
      GlobalConstants.is_sport = true;
    }
  }

  toggle_gospel() {
    if (GlobalConstants.is_gospel == true) {
      GlobalConstants.is_gospel = false;
      GlobalConstants.isBahasa = false;
    }
    else {
      GlobalConstants.is_gospel = true;
      GlobalConstants.isBahasa = false;
    }
  }

  toggle_bahasa() {
    if (GlobalConstants.isBahasa == true) {
      GlobalConstants.isBahasa = false;
      GlobalConstants.is_gospel = false;
      GlobalConstants.isChinese = false;
    }
    else {
      GlobalConstants.isBahasa = true;
      GlobalConstants.is_gospel = false;
      GlobalConstants.isChinese = false;
    }
  }

  toggle_chinese() {
    if (GlobalConstants.isChinese == true) {
      GlobalConstants.isChinese = false;
      GlobalConstants.isBahasa = false;
    }
    else {
      GlobalConstants.isChinese = true;
      GlobalConstants.isBahasa = false;
    }
  }

  toggle_ai() {
    this.analysis_ai_expanded = this.analysis_ai_expanded === false;
  }

  getChinese() {
    return GlobalConstants.isChinese;
  }

  getBahasa() {
    return GlobalConstants.isBahasa;
  }

  getGospel() {
    return GlobalConstants.is_gospel;
  }

  getFiltered() {
    return GlobalConstants.isFiltered;
  }

  public async getNews(is_positive: any) {

    if (!is_positive) {
      GlobalConstants.isFiltered = true;
    }
    else {
      GlobalConstants.isFiltered = false;
    }
    await this.newsService.getNews(is_positive)
      .then((data) => {
        GlobalConstants.news_arrays = data;
      })
      .catch((error) => {
        console.log("this.getNews() Promise rejected with " + error);
      });

  }

  public async getNewsSports() {
    await this.newsService.getNewsSports()
      .then((data) => {
        this.news_sport_arrays = data;
      })
      .catch((error) => {
        console.log("this.getNews() Promise rejected with " + error);
      });
  }

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

  toggle_prediction() {
    this.prediction_accordion_expanded = this.prediction_accordion_expanded === false;
  }

  toggle_analysis() {
    this.analysis_accordion_expanded = this.analysis_accordion_expanded === false;
  }

  toggle_pinyin() {
    this.pinyin_accordion_expanded = this.pinyin_accordion_expanded === false;
  }

  get_paris_time() {
    var d = new Date();

    let date_current = d.setHours(d.getHours() - 6);
    const date = this.datePipe.transform(date_current, 'yyyy-MM-dd hh:mm a');
    return date
  }

  get_today_date() {
    var d = new Date();
    const date = this.datePipe.transform(d, 'yyyy-MM-dd');
    return date
  }

  ai_analysis: any =
    "\n\nOpen AI: Predicting a score for LEE Zii Jia vs Lakshya SEN is hard. LEE may win 21-18, 21-19 due to experience. SEN might struggle. "
    + "\nMixtral AI: LEE could win 2-1. LEE has consistency and power, SEN is agile and tactical. Expect tight matches. "
    + "\nClaude AI: Close match expected. LEE might win 21-18, 19-21, 21-19. LEE's experience gives edge over SEN. "

    + "\n\nOpen AI: Meramal skor bagi perlawanan antara LEE Zii Jia dan Lakshya SEN adalah sukar. LEE mungkin menang 21-18, 21-19 disebabkan pengalaman. SEN mungkin menghadapi kesukaran. "
    + "\nMixtral AI: LEE boleh menang 2-1. LEE mempunyai konsistensi dan kuasa, SEN agil dan taktikal. Jangkakan perlawanan ketat. "
    + "\nClaude AI: Perlawanan ketat dijangkakan. LEE mungkin menang 21-18, 19-21, 21-19. Pengalaman LEE memberi kelebihan berbanding SEN. "

  prediction: any =
    "Open, Mixtral and Claude AI Prediction"
    + "\nMsia 8.30 pm Bronze-Medal LZJ Wins "
    + "\n\nWorld Ranking"
    + "\nLZJ(7) vs Lakshya(22)"

  async getNews_arrays() {
    const myJSON = JSON.stringify(GlobalConstants.news_arrays);
    //console.log("myJSON-->" + myJSON[0])
    this.news_arrays = GlobalConstants.news_arrays
    return this.news_arrays
  }

  async copyO() {

    let more = "\n\nView more at https://eyebot.name.my/news"
    let string = this.prediction + this.ai_analysis + more;

    let aux = document.createElement("textarea");

    aux.setAttribute("value", string);
    aux.innerHTML = string;
    document.body.appendChild(aux);

    //document.body.appendChild(document.createTextNode("\n"));
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  }
  async copy(value: any) {
    let title = value.title
    let pubDate = "\n\nDate: " + value.pubDate
    let desc = "\n\nDescription: " + value.description
    let bahasa = "\n\nBahasa: " + value.description_my
    let link = "\n\nSource: " + value.link
    let bible_ai = "\n\nAI Bible: " + value.bible_ai
    let bible_life = "\n\nBible life example: " + value.bible_life
    let more = "\n\nView more at https://eyebot.name.my/news"
    let more_bible = "\n\nView more at https://eyebot.name.my/map/gospel"

    let chinese_ai = "\n\nAI 圣经故事: " + value.bible_life_cn
    let chinese_desc = "\n\n 中: " + value.description_cn
    let pinyin = "\n\nPin Yin: " + value.pinyin

    let string = title + desc + more

    console.log("this.is_gospel-->", GlobalConstants.is_gospel)

    if (GlobalConstants.isBahasa && !GlobalConstants.is_gospel) {
      string = title + desc + bahasa + more
    }

    if (GlobalConstants.isChinese) {
      string = title + chinese_desc + desc + more
    }

    if (GlobalConstants.is_gospel) {

      string = title + desc + bible_ai + bible_life + more_bible

      if (GlobalConstants.isChinese) {
        string = title + chinese_ai + pinyin + chinese_desc + desc + bible_ai + bible_life + more_bible
      }
      console.log("this.is_gospel running-->", string)
    }

    let aux = document.createElement("textarea");

    aux.setAttribute("value", string);
    aux.innerHTML = string;
    document.body.appendChild(aux);

    //document.body.appendChild(document.createTextNode("\n"));
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  }

  newLine(pinyin: any) {
    try {
      var regex = new RegExp(',', 'g');
      //replace via regex
      pinyin = pinyin.toString().replace(regex, ',\n');

      console.log(pinyin)
      regex = new RegExp("\\b([A-Z])\\.", 'g');
      pinyin = pinyin.replace(regex, "$1");

      //replace remaining spaces:
      pinyin = pinyin.replace(/\./g, ". \n");
      //regex = new RegExp(').', 'g');
      //pinyin = pinyin.toString().replace(regex, '\n');
    } catch (e) {
      console.log(e);
    }
    return pinyin
  }

  newLineCN(cn: any) {
    try {
      var regex = new RegExp('，', 'g');
      //replace via regex
      cn = cn.toString().replace(regex, ',\n');

      console.log(cn)
      regex = new RegExp('。', 'g');
      cn = cn.toString().replace(regex, '。\n');
    } catch (e) {
      console.log(e);
    }
    return cn

  }

}
