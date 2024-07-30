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
  headline: any = "https://paris2024.rtm.gov.my/pingat"
  tv: any = "https://olympics.bwfbadminton.com/results/4752/paris-2024-olympic-games-badminton-competition/" + this.get_today_date();
  news_arrays: any;
  bible_example_accordion_expanded: any = false

  constructor(private newsService: NewsService, private datePipe: DatePipe) { }
  ngOnInit() {
    this.getNews(true);
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
  public async getNews(is_positive: any) {
    await this.newsService.getNews(is_positive)
      .then((data) => {
        this.news_arrays = data;
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

  get_paris_time() {
    var d = new Date();

    let date_current =  d.setHours(d.getHours() - 6);
    const date = this.datePipe.transform(date_current, 'yyyy-MM-dd hh:mm a');
    return date
  }

  get_today_date() {
    var d = new Date();
    const date = this.datePipe.transform(d, 'yyyy-MM-dd');
    return date
  }

  async copy(value: any) {
    let title = value.title
    let pubDate = "\n\nDate: " + value.pubDate
    let desc = "\n\nDescription: " + value.description
    let link = "\nSource: " + value.link
    let more = "\n\nView more at https://eyebot.name.my/news"

    let string = title  + desc + more
    
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
