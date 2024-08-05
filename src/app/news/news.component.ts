import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import "@angular/compiler";
import { CareTakerService } from '../service/caretaker.service';
import { NewsService } from '../service/news.service';
import { DatePipe } from '@angular/common';

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

  is_gospel: any = false;
  is_sport: any = true;
  isBahasa: any = true;
  headline: any = "https://paris2024.rtm.gov.my/pingat"
  tv: any = "https://olympics.bwfbadminton.com/results/4752/paris-2024-olympic-games-badminton-competition/" + this.get_today_date();
  news_arrays: any;
  news_sport_arrays: any;
  bible_example_accordion_expanded: any = false

  prediction_accordion_expanded: any = false
  analysis_accordion_expanded: any = false

  constructor(private newsService: NewsService, private datePipe: DatePipe) { }
  ngOnInit() {
    this.getNews(true);
    this.getNewsSports();
  }

  toggle_sport() {
    if (this.is_sport == true) {
      this.is_sport = false;
    }
    else {
      this.is_sport = true;
    }
  }

  toggle_gospel() {
    if (this.is_gospel == true) {
      this.is_gospel = false;
    }
    else {
      this.is_gospel = true;
    }
  }

  toggle_bahasa() {
    if (this.isBahasa == true) {
      this.isBahasa = false;
    }
    else {
      this.isBahasa = true;
    }
  }

  public async getNews(is_positive: any) {
    await this.newsService.getNews(is_positive)
      .then((data) => {
        this.news_arrays = data;
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
    "Open AI Prediction"
    + "\nMsia 8.30 pm Bronze-Medal LZJ Wins "


    + "\n\nWorld Ranking"
    + "\nLZJ(7) vs Lakshya(22)"


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
    let bible_ai = "\n\nBible verse: " + value.bible_ai
    let bible_life = "\n\nBible life example: " + value.bible_life
    let more = "\n\nView more at https://eyebot.name.my/news"

    let string = title + desc + more

    console.log("this.is_gospel-->", this.is_gospel)

    if (this.isBahasa && !this.is_gospel) {
      string = title + desc + bahasa + more
    }

    if (this.is_gospel) {

      string = title + desc + bible_ai + bible_life + more
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
}
