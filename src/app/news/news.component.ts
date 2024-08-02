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

  prediction: any =
    "Open AI Prediction"
    + "\n\nMsia 2.30 pm Chen/Jia Wins  21-16, 21-18"
    + "\nMsia 6 pm Aaron/Soh Wins  21-18, 19-21, 21-17"
    + "\n\nWomen's doubles team of Pearly Tan and Thinaah Muralitharan faces strong competition today. Their chances are slim against China's top pair. Expected score: Chen/Jia 21-16, 21-18. "
    + "Aaron Chia and Soh Wooi Yik, are highly competitive in the Olympic badminton event today. Given their strong track record and recent performances, they have a solid chance of advancing. I predict a close match, with a score of 21-18, 19-21, 21-17 in favor of Chia and Soh. "

    + "\n\nPasukan ganda wanita Pearly Tan dan Thinaah Muralitharan menghadapi persaingan sengit hari ini. Peluang mereka tipis berdepan dengan pasangan teratas China. Markah dijangkakan: Chen/Jia 21-16, 21-18. "
    + "Aaron Chia dan Soh Wooi Yik, sangat kompetitif dalam acara badminton Olimpik hari ini. Dengan rekod cemerlang mereka dan prestasi terkini, mereka mempunyai peluang kukuh untuk melangkah ke hadapan. Saya meramalkan pertandingan ketat, dengan skor 21-18, 19-21, 21-17 untuk kebaikan Chia dan Soh. "

    + "\n\nWorld Ranking"
    + "\nNo 1. Chen/Jia"
    + "\nNo 1. Liang/Wang"
    + "\nNo 3. Aaron/Soh"
    + "\nNo 12. Pearly/Thinaah"

  async copyO() {

    let more = "\n\nView more at https://eyebot.name.my/news"
    let string = this.prediction + more;

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
